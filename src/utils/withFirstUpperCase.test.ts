import { withFirstUpperCase } from './withFirstUpperCase';

describe('withFirstUpperCase', () => {
  test('capitalizes the first letter of a lowercase word', () => {
    const input = 'pikachu';
    const result = withFirstUpperCase(input);
    expect(result).toBe('Pikachu');
  });

  test('leaves the first letter capitalized if it already is', () => {
    const input = 'Charizard';
    const result = withFirstUpperCase(input);
    expect(result).toBe('Charizard');
  });

  test('works with a single lowercase letter', () => {
    const input = 'p';
    const result = withFirstUpperCase(input);
    expect(result).toBe('P');
  });

  test('works with a single uppercase letter', () => {
    const input = 'C';
    const result = withFirstUpperCase(input);
    expect(result).toBe('C');
  });

  test('handles strings with only one character', () => {
    const input = 'a';
    const result = withFirstUpperCase(input);
    expect(result).toBe('A');
  });

  test('does not modify other characters in the string', () => {
    const input = 'bulbasaur';
    const result = withFirstUpperCase(input);
    expect(result).toBe('Bulbasaur');
  });

  test('works with special characters and numbers in the string', () => {
    const input = '1charmander';
    const result = withFirstUpperCase(input);
    expect(result).toBe('1charmander');
  });
});
