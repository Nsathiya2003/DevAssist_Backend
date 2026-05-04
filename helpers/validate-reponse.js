export const validateResponse = (parsed) => {
  if (!parsed) return false;

  // check common structures
  if (parsed.title && Array.isArray(parsed.points)) return true;
  if (parsed.summary && Array.isArray(parsed.summary)) return true;
  if (parsed.topic && Array.isArray(parsed.differences)) return true;
  if (parsed.answer) return true;

  return false;
};