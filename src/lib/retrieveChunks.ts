import { prisma } from "@/lib/prisma";

interface RetrievedChunk {
  id: string;
  content: string;
  chunkIndex: number;
  fileName: string;
  documentId: string;
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getKeywords(question: string) {
  const stopWords = new Set([
    "what",
    "who",
    "when",
    "where",
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
    "about",
    "tell",
    "me",
    "do",
    "does",
    "did",
    "can",
    "you",
  ]);

  return normalizeText(question)
    .split(" ")
    .filter(
      (word) =>
        word.length >= 2 &&
        !stopWords.has(word)
    );
}

export async function retrieveChunks(
  userId: string,
  question: string,
  limit = 5
): Promise<RetrievedChunk[]> {
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
        documentId: true,
        document: {
          select: {
            fileName: true,
          },
        },
      },
    });

  if (chunks.length === 0) {
    return [];
  }

  const keywords = getKeywords(question);

  if (keywords.length === 0) {
    return chunks
      .slice(0, limit)
      .map((chunk) => ({
        id: chunk.id,
        content: chunk.content,
        chunkIndex: chunk.chunkIndex,
        documentId: chunk.documentId,
        fileName: chunk.document.fileName,
      }));
  }

  const scored = chunks.map((chunk) => {
    const content = normalizeText(
      chunk.content
    );

    let score = 0;

    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        score += 1;

        const matches =
          content.split(keyword).length - 1;

        score += Math.min(matches * 0.25, 1);
      }
    }

    return {
      ...chunk,
      score,
    };
  });

  return scored
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((chunk) => ({
      id: chunk.id,
      content: chunk.content,
      chunkIndex: chunk.chunkIndex,
      documentId: chunk.documentId,
      fileName: chunk.document.fileName,
    }));
}