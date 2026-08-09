const DEFAULT_CHUNK_SIZE = 1200;
const DEFAULT_CHUNK_OVERLAP = 200;

export function chunkText(
  text: string,
  chunkSize = DEFAULT_CHUNK_SIZE,
  overlap = DEFAULT_CHUNK_OVERLAP
): string[] {
  const cleanText = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();

  if (!cleanText) {
    return [];
  }

  if (overlap >= chunkSize) {
    throw new Error(
      "Chunk overlap must be smaller than chunk size."
    );
  }

  const chunks: string[] = [];

  let start = 0;

  while (start < cleanText.length) {
    let end = Math.min(
      start + chunkSize,
      cleanText.length
    );

    if (end < cleanText.length) {
      const paragraphBreak =
        cleanText.lastIndexOf("\n\n", end);

      const sentenceBreak =
        cleanText.lastIndexOf(". ", end);

      const spaceBreak =
        cleanText.lastIndexOf(" ", end);

      if (
        paragraphBreak > start + chunkSize * 0.6
      ) {
        end = paragraphBreak;
      } else if (
        sentenceBreak > start + chunkSize * 0.6
      ) {
        end = sentenceBreak + 1;
      } else if (
        spaceBreak > start + chunkSize * 0.6
      ) {
        end = spaceBreak;
      }
    }

    const chunk = cleanText
      .slice(start, end)
      .trim();

    if (chunk) {
      chunks.push(chunk);
    }

    if (end >= cleanText.length) {
      break;
    }

    start = Math.max(
      end - overlap,
      start + 1
    );
  }

  return chunks;
}