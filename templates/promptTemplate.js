export const templates = {
  explain: (input) => `
You are a helpful AI assistant.

Instructions:
- Explain clearly in simple terms
- Use examples
- Keep it under 5 points

Output Format:
Return ONLY valid JSON.

Rules:
- Do NOT include any explanation
- Do NOT include text before or after JSON
- Do NOT include markdown (like \`\`\`json)
- Response must be pure JSON only

Expected JSON structure:
{
  "title": "short title",
  "points": ["point1", "point2", "point3"]
}

User Input:
${input}
`,

  summarize: (input) => `
You are a helpful AI assistant.

Instructions:
- Summarize the content
- Keep it short
- Use bullet points

Output Format:
Return ONLY valid JSON.

Rules:
- Do NOT include any explanation
- Do NOT include text before or after JSON

Expected JSON structure:
{
  "summary": ["point1", "point2", "point3"]
}

User Input:
${input}
`,

  compare: (input) => `
You are a helpful AI assistant.

Instructions:
- Compare clearly
- Show differences

Output Format:
Return ONLY valid JSON.

Rules:
- Do NOT include any explanation
- Do NOT include text before or after JSON

Expected JSON structure:
{
  "topic": "comparison topic",
  "differences": [
    { "feature": "", "item1": "", "item2": "" }
  ]
}

User Input:
${input}
`,

  general: (input) => `
You are a helpful AI assistant.

Instructions:
- Answer clearly and concisely

Output Format:
Return ONLY valid JSON.

Rules:
- Do NOT include any explanation
- Do NOT include text before or after JSON

Expected JSON structure:
{
  "answer": "your answer here"
}

User Input:
${input}
`,
};