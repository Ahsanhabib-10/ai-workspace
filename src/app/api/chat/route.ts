import { NextResponse } from "next/server";
import { generateResponse } from "@/services/ai/groq";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const reply = await generateResponse(message);

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate response.",
      },
      {
        status: 500,
      }
    );
  }
}