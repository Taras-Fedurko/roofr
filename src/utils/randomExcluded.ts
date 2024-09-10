/**
 * Select a random number from a range. Can exclude specific numbers.
 * This is used to prevent battles between the same Pokémon.
 * @param min number
 * @param max number
 * @param excluded number
 * @returns 
 */
export const randomExcluded = (min: number, max: number, excluded?: number) => {
  let n = Math.floor(Math.random() * (max - min)) + min;

  if (excluded !== undefined && n >= excluded) n++;

  return n;
};
