import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is not configured."
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function generateEmbedding(
  text: string
): Promise<number[]> {
  const cleanText = text.trim();

  if (!cleanText) {
    throw new Error(
      "Cannot generate embedding for empty text."
    );
  }

  const response =
    await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: cleanText,
      config: {
        taskType: "RETRIEVAL_DOCUMENT",
        outputDimensionality: 768,
      },
    });

  const values =
    response.embeddings?.[0]?.values;

  if (!values || values.length === 0) {
    throw new Error(
      "Gemini returned an empty embedding."
    );
  }

  return values;
}