import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chunkText } from "@/lib/chunkText";
import { auth } from "@/auth";
import { generateEmbedding } from "@/lib/embeddings";

export async function GET() {
try {
const session = await auth();


if (!session?.user?.id) {
  return NextResponse.json(
    {
      success: false,
      error: "Unauthorized. Please login first.",
    },
    { status: 401 }
  );
}

const documents =
  await prisma.knowledgeDocument.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fileName: true,
      createdAt: true,
    },
  });

return NextResponse.json({
  success: true,
  documents,
});


} catch (error) {
console.error("Knowledge fetch error:", error);


return NextResponse.json(
  {
    success: false,
    error:
      error instanceof Error
        ? error.message
        : "Failed to fetch knowledge.",
  },
  { status: 500 }
);


}
}

export async function POST(request: Request) {
try {
const session = await auth();


if (!session?.user?.id) {
  return NextResponse.json(
    {
      success: false,
      error: "Unauthorized. Please login first.",
    },
    { status: 401 }
  );
}

const body = await request.json();

const fileName =
  typeof body.fileName === "string"
    ? body.fileName.trim()
    : "";

const text =
  typeof body.text === "string"
    ? body.text.trim()
    : "";

if (!fileName) {
  return NextResponse.json(
    {
      success: false,
      error: "File name is required.",
    },
    { status: 400 }
  );
}

if (!text) {
  return NextResponse.json(
    {
      success: false,
      error: "Document text is required.",
    },
    { status: 400 }
  );
}

const chunks = chunkText(text);

if (chunks.length === 0) {
  return NextResponse.json(
    {
      success: false,
      error:
        "No readable chunks could be created from this document.",
    },
    { status: 400 }
  );
}

console.log(
  `Creating ${chunks.length} chunks for ${fileName}`
);

// Generate Gemini embeddings for every chunk
const chunksWithEmbeddings =
  await Promise.all(
    chunks.map(async (content, index) => {
      const embedding =
        await generateEmbedding(content);

      return {
        content,
        chunkIndex: index,
        embedding,
      };
    })
  );

const result =
  await prisma.$transaction(async (tx) => {
    const document =
      await tx.knowledgeDocument.create({
        data: {
          fileName,
          text,
          userId: session.user.id,
        },
        select: {
          id: true,
          fileName: true,
          createdAt: true,
        },
      });

    await tx.knowledgeChunk.createMany({
      data: chunksWithEmbeddings.map(
        (chunk) => ({
          documentId: document.id,
          content: chunk.content,
          chunkIndex: chunk.chunkIndex,
          embedding: chunk.embedding,
        })
      ),
    });

    return document;
  });

return NextResponse.json({
  success: true,
  document: result,
  chunksCreated: chunks.length,
  embeddingsCreated: chunksWithEmbeddings.length,
});


} catch (error) {
console.error("Knowledge save error:", error);


return NextResponse.json(
  {
    success: false,
    error:
      error instanceof Error
        ? error.message
        : "Failed to save knowledge.",
  },
  { status: 500 }
);


}
}

export async function DELETE(request: Request) {
try {
const session = await auth();


if (!session?.user?.id) {
  return NextResponse.json(
    {
      success: false,
      error: "Unauthorized. Please login first.",
    },
    { status: 401 }
  );
}

const { searchParams } =
  new URL(request.url);

const id = searchParams.get("id");

if (!id) {
  return NextResponse.json(
    {
      success: false,
      error: "Document ID is required.",
    },
    { status: 400 }
  );
}

const document =
  await prisma.knowledgeDocument.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

if (!document) {
  return NextResponse.json(
    {
      success: false,
      error: "Document not found.",
    },
    { status: 404 }
  );
}

await prisma.knowledgeDocument.delete({
  where: {
    id: document.id,
  },
});

return NextResponse.json({
  success: true,
  message:
    "Document and its chunks deleted successfully.",
});


} catch (error) {
console.error(
"Knowledge delete error:",
error
);


return NextResponse.json(
  {
    success: false,
    error:
      error instanceof Error
        ? error.message
        : "Failed to delete document.",
  },
  { status: 500 }
);


}
}
