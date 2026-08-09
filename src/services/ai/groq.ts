import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is missing.");
}

const groq = new Groq({
  apiKey,
});

export async function generateResponse(prompt: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,

    messages: [
      {
        role: "system",
        content:
          "You are Nexora AI, an expert career and resume assistant. Give accurate, practical and professional feedback.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return (
    completion.choices[0]?.message?.content ??
    "No response generated."
  );
}

export async function reviewResume(resumeText: string) {
  const prompt = `
Analyze the following resume professionally.

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.

Use exactly this structure:

{
  "score": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "skills": [],
  "recommendedSkills": [],
  "experienceFeedback": "",
  "educationFeedback": "",
  "atsSuggestions": [],
  "improvements": []
}

Rules:

- score must be a number from 0 to 100.
- strengths must contain useful positive observations.
- weaknesses must contain specific problems.
- skills must contain skills actually found in the resume.
- recommendedSkills must contain skills that could improve the candidate's career profile.
- atsSuggestions must contain practical ATS improvements.
- improvements must contain specific actionable recommendations.
- Do not invent experience, education or skills that are not present.
- Keep the analysis professional and useful.

Resume:

${resumeText}
`;

  return generateResponse(prompt);
}