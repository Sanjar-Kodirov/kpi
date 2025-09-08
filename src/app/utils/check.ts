export const objectIsEmpty = (obj: object) => {
  for (const i in obj) return false;
  return true;
};
