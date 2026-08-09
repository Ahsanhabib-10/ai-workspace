import { NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/embeddings";

export async function GET() {
  try {
    const embedding = await generateEmbedding(
      "Nexora AI is an intelligent workspace."
    );

    return NextResponse.json({
      success: true,
      dimensions: embedding.length,
      preview: embedding.slice(0, 5),
    });
  } catch (error) {
    console.error(
      "Embedding test error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Embedding test failed.",
      },
      { status: 500 }
    );
  }
}