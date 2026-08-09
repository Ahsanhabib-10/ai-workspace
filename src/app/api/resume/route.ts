import { NextResponse } from "next/server";
import { extractPdfText } from "@/services/resume/extractText";
import { reviewResume } from "@/services/ai/groq";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No resume file provided." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF resumes are supported right now." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const text = await extractPdfText(buffer);

    if (!text) {
      return NextResponse.json(
        { error: "Could not extract text from this PDF." },
        { status: 400 }
      );
    }

const review = await reviewResume(text);

return NextResponse.json({
  success: true,
  text,
  review,
});

  } catch (error) {
    console.error("Resume extraction error:", error);

    return NextResponse.json(
      { error: "Failed to process resume." },
      { status: 500 }
    );
  }
}