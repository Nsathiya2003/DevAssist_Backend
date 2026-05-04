export const extractJSON = (text) => {
  const match = text.match(/\{[\s\S]*\}/);
  console.log('matched',match)
  return match ? match[0] : null;
};