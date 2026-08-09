import { NextResponse } from "next/server";
import { generateResponse } from "@/services/ai/groq";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const pdfText = body.pdfText;
    const question = body.question;

    if (!pdfText || !question) {
      return NextResponse.json(
        {
          error:
            "PDF text and question are required.",
        },
        { status: 400 }
      );
    }

    const prompt = `
You are Nexora AI, an intelligent document assistant.

Answer the user's question using ONLY the information contained in the uploaded PDF.

Important rules:

1. Do not invent information.
2. Do not use outside knowledge unless absolutely necessary.
3. If the answer cannot be found in the PDF, clearly say:
   "I couldn't find that information in the uploaded document."
4. Give a clear and useful answer.
5. Use simple formatting when helpful.
6. If the user asks for a summary, summarize the important points.
7. If the user asks to explain something, explain it in simple language.

UPLOADED PDF:

${pdfText}

USER QUESTION:

${question}
`;

    const answer = await generateResponse(prompt);

    console.log("PDF Chat Question:", question);
    console.log("PDF Chat Answer:", answer);

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error("PDF Chat Error:", error);

    return NextResponse.json(
      {
        error:
          "Failed to generate an answer from the PDF.",
      },
      { status: 500 }
    );
  }
}