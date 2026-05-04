import { templates } from "../templates/promptTemplate.js";

const detectTask = (input) => {
  const text = input.toLowerCase();

  if (text.includes("explain")) return "explain";
  if (text.includes("summary") || text.includes("summarize")) return "summarize";
  if (text.includes("difference")) return "compare";

  return "general";
};


export const buildPrompt = (input) => {
  const task = detectTask(input);

  const templateFn = templates[task] || templates.general;

  return templateFn(input);
};