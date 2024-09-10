export const randomExcluded = (min: number, max: number, excluded?: number) => {
  let n = Math.floor(Math.random() * (max - min)) + min;

  if (excluded !== undefined && n >= excluded) n++;

  return n;
};
