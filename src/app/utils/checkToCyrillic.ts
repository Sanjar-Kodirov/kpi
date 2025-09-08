const cyrillicPattern = /^[\u0400-\u04FF]+$/;
export const checkToCyrillic = (text: string) => {
  let hasCyrillic = false;
  for (let i = 0; i < text.length; i++) {
    if (cyrillicPattern.test(text[i])) {
      hasCyrillic = true;
      break;
    }
  }
  return hasCyrillic;
};
