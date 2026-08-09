import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getQuestionTerms(question: string) {
  const stopWords = new Set([
    "what",
    "which",
    "where",
    "when",
    "who",
    "why",
    "how",
    "is",
    "are",
    "was",
    "were",
    "the",
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "in",
    "on",
    "for",
    "with",
    "about",
    "tell",
    "me",
    "do",
    "does",
    "did",
    "can",
    "you",
    "have",
    "has",
    "this",
    "that",
    "from",
    "document",
    "information",
  ]);

  return normalizeText(question)
    .split(" ")
    .filter(
      (word) =>
        word.length >= 2 &&
        !stopWords.has(word)
    );
}

function scoreChunk(
  chunk: string,
  terms: string[]
) {
  const normalizedChunk =
    normalizeText(chunk);

  let score = 0;

  for (const term of terms) {
    if (normalizedChunk.includes(term)) {
      score += 1;

      // Give extra weight to exact word matches.
      const words =
        normalizedChunk.split(" ");

      const occurrences = words.filter(
        (word) => word === term
      ).length;

      score += occurrences * 2;
    }
  }

  return score;
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const question = body.question;

    // --------------------------------
    // Validate question
    // --------------------------------

    if (
      typeof question !== "string" ||
      !question.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Question is required.",
        },
        { status: 400 }
      );
    }

    const cleanQuestion =
      question.trim();

    // --------------------------------
    // Check knowledge base
    // --------------------------------

    const documentCount =
      await prisma.knowledgeDocument.count();

    if (documentCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No knowledge documents have been uploaded yet.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Get all chunks
    // --------------------------------

    const chunks =
      await prisma.knowledgeChunk.findMany({
        select: {
          id: true,
          content: true,
          chunkIndex: true,
          document: {
            select: {
              fileName: true,
            },
          },
        },
      });

    if (chunks.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No knowledge chunks are available. Please upload the document again.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Extract important question terms
    // --------------------------------

    const questionTerms =
      getQuestionTerms(cleanQuestion);

    // --------------------------------
    // Score chunks
    // --------------------------------

    const scoredChunks = chunks
      .map((chunk) => ({
        ...chunk,
        score: scoreChunk(
          chunk.content,
          questionTerms
        ),
      }))
      .sort((a, b) => b.score - a.score);

    // --------------------------------
    // Select relevant chunks
    // --------------------------------

    let selectedChunks =
      scoredChunks
        .filter((chunk) => chunk.score > 0)
        .slice(0, 6);

    /*
     * If keyword matching finds nothing,
     * provide a small amount of context
     * instead of sending the entire database.
     */

    if (selectedChunks.length === 0) {
      selectedChunks =
        scoredChunks.slice(0, 3);
    }

    // --------------------------------
    // Build retrieved context
    // --------------------------------

    const retrievedKnowledge =
      selectedChunks
        .map(
          (chunk, index) =>
            `SOURCE ${index + 1}
DOCUMENT: ${chunk.document.fileName}
CHUNK: ${chunk.chunkIndex}

${chunk.content}`
        )
        .join("\n\n---\n\n");

    // --------------------------------
    // AI system prompt
    // --------------------------------

    const systemPrompt = `
You are Nexora AI, an intelligent personal knowledge assistant.

Answer the user's question using ONLY the retrieved knowledge below.

Rules:

- Use the retrieved knowledge as the primary source.
- Do not invent or assume information.
- If the answer cannot be supported by the retrieved knowledge, clearly say that the information was not found in the uploaded documents.
- Give a clear and useful answer.
- Do not mention internal retrieval, chunks, scoring, or implementation details.
- When useful, mention the document name that contains the information.
- If multiple sources are relevant, combine them carefully.
- Keep the answer focused on the user's question.

RETRIEVED KNOWLEDGE:

${retrievedKnowledge}
`;

    // --------------------------------
    // Groq API
    // --------------------------------

    const apiKey =
      process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GROQ_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const aiResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${apiKey}`,
        },

        body: JSON.stringify({
          model:
            "llama-3.3-70b-versatile",

          temperature: 0.2,

          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: cleanQuestion,
            },
          ],
        }),
      }
    );

    const aiData =
      await aiResponse.json();

    if (!aiResponse.ok) {
      console.error(
        "Groq API error:",
        aiData
      );

      throw new Error(
        aiData?.error?.message ||
          "Failed to generate AI response."
      );
    }

    const answer =
      aiData?.choices?.[0]?.message
        ?.content;

    if (!answer) {
      throw new Error(
        "AI returned an empty response."
      );
    }

    // --------------------------------
    // Sources
    // --------------------------------

    const uniqueSources =
      Array.from(
        new Set(
          selectedChunks.map(
            (chunk) =>
              chunk.document.fileName
          )
        )
      ).map((fileName) => ({
        fileName,
      }));

    // --------------------------------
    // Debug information
    // --------------------------------

    console.log(
      `Knowledge retrieval: ${selectedChunks.length}/${chunks.length} chunks selected`
    );

    // --------------------------------
    // Response
    // --------------------------------

    return NextResponse.json({
      success: true,
      answer,
      sources: uniqueSources,
      chunksUsed: selectedChunks.length,
    });
  } catch (error) {
    console.error(
      "Knowledge chat error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}