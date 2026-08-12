import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { generateEmbedding } from "@/lib/embeddings";
import { cosineSimilarity } from "@/lib/cosineSimilarity";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// --------------------------------
// Generate a clean chat title
// --------------------------------

function generateChatTitle(question: string) {
  const cleaned = question
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "New Chat";
  }

  // Remove common question starters
  const title = cleaned
    .replace(
      /^(please|can you|could you|would you|tell me|explain|what is|what are|how do i|how can i|why is|why are)\s+/i,
      ""
    )
    .trim();

  if (!title) {
    return cleaned.length > 50
      ? `${cleaned.slice(0, 50)}...`
      : cleaned;
  }

  const finalTitle =
    title.charAt(0).toUpperCase() +
    title.slice(1);

  return finalTitle.length > 50
    ? `${finalTitle.slice(0, 50)}...`
    : finalTitle;
}

export async function POST(request: Request) {
  try {
    // --------------------------------
    // 1. Check logged-in user
    // --------------------------------

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unauthorized. Please login first.",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // --------------------------------
    // 2. Read request
    // --------------------------------

    const body = await request.json();

    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : "";

    const requestedChatId =
      typeof body.chatId === "string"
        ? body.chatId.trim()
        : "";

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          error: "Question is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // 3. Find or create chat
    // --------------------------------

    let chatId = requestedChatId;

    if (chatId) {
      const existingChat =
        await prisma.chat.findFirst({
          where: {
            id: chatId,
            userId,
          },
        });

      if (!existingChat) {
        return NextResponse.json(
          {
            success: false,
            error: "Chat not found.",
          },
          { status: 404 }
        );
      }
    } else {
      const newChat =
        await prisma.chat.create({
          data: {
            userId,
            title: generateChatTitle(question),
          },
        });

      chatId = newChat.id;
    }

    // --------------------------------
    // 4. Save user message
    // --------------------------------

    await prisma.chatMessage.create({
      data: {
        chatId,
        role: "user",
        content: question,
      },
    });

    // --------------------------------
    // 5. Generate query embedding
    // --------------------------------

    const queryEmbedding =
      await generateEmbedding(question);

    // --------------------------------
    // 6. Get user's knowledge chunks
    // --------------------------------

    const chunks =
      await prisma.knowledgeChunk.findMany({
        where: {
          document: {
            userId,
          },
        },
        select: {
          id: true,
          content: true,
          chunkIndex: true,
          embedding: true,
          document: {
            select: {
              id: true,
              fileName: true,
            },
          },
        },
      });

    // --------------------------------
    // 7. No knowledge documents
    // --------------------------------

    if (chunks.length === 0) {
      const answer =
        "I don't have any knowledge documents to search yet. Please upload a document first.";

      await prisma.chatMessage.create({
        data: {
          chatId,
          role: "assistant",
          content: answer,
        },
      });

      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        chatId,
        answer,
        sources: [],
      });
    }

    // --------------------------------
    // 8. Calculate similarity
    // --------------------------------

    const scoredChunks = chunks
      .filter(
        (chunk) =>
          Array.isArray(chunk.embedding) &&
          chunk.embedding.length > 0
      )
      .map((chunk) => {
        const embedding =
          chunk.embedding as number[];

        const score = cosineSimilarity(
          queryEmbedding,
          embedding
        );

        return {
          id: chunk.id,
          content: chunk.content,
          chunkIndex: chunk.chunkIndex,
          fileName:
            chunk.document.fileName,
          documentId: chunk.document.id,
          score,
        };
      });

    // --------------------------------
    // 9. Sort by relevance
    // --------------------------------

    scoredChunks.sort(
      (a, b) => b.score - a.score
    );

    // --------------------------------
    // 10. Take top 5 chunks
    // --------------------------------

    const topChunks =
      scoredChunks.slice(0, 5);

    // --------------------------------
    // 11. Build knowledge context
    // --------------------------------

    const context = topChunks
      .map(
        (chunk, index) =>
          `[Source ${index + 1}: ${chunk.fileName}]\n${chunk.content}`
      )
      .join("\n\n");

    // --------------------------------
    // 12. Ask Groq
    // --------------------------------

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `You are Nexora AI, an intelligent knowledge assistant.

Answer the user's question using the provided knowledge context.

Rules:

- Use the provided context as your primary source.
- Do not invent facts that are not supported by the context.
- If the answer is not present in the context, clearly say that the information is not available in the user's knowledge base.
- Give a clear and useful answer.
- Mention relevant sources when appropriate.

Knowledge Context:

${context}`,
          },
          {
            role: "user",
            content: question,
          },
        ],

        temperature: 0.2,
      });

    // --------------------------------
    // 13. Get AI answer
    // --------------------------------

    const answer =
      completion.choices[0]?.message
        ?.content ??
      "I could not generate an answer.";

    // --------------------------------
    // 14. Save AI message
    // --------------------------------

    await prisma.chatMessage.create({
      data: {
        chatId,
        role: "assistant",
        content: answer,
      },
    });

    // --------------------------------
    // 15. Update chat timestamp
    // --------------------------------

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    // --------------------------------
    // 16. Prepare sources
    // --------------------------------

    const sources = topChunks.map(
      (chunk) => ({
        documentId: chunk.documentId,
        fileName: chunk.fileName,
        chunkIndex: chunk.chunkIndex,
        score: Number(
          chunk.score.toFixed(4)
        ),
      })
    );

    // --------------------------------
    // 17. Return answer
    // --------------------------------

    return NextResponse.json({
      success: true,
      chatId,
      answer,
      sources,
    });
  } catch (error) {
    console.error(
      "AI API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to process AI request.",
      },
      { status: 500 }
    );
  }
}