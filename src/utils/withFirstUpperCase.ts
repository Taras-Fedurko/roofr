export const withFirstUpperCase = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}