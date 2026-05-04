export const extractJSON = (text) => {
  try {
    const start = text.indexOf("{");
    if (start === -1) return null;

    let open = 0;
    let end = -1;

    for (let i = start; i < text.length; i++) {
      if (text[i] === "{") open++;
      if (text[i] === "}") open--;

      if (open === 0) {
        end = i;
        break;
      }
    }

    if (end === -1) return null;

    return text.substring(start, end + 1);
  } catch (err) {
    return null;
  }
};