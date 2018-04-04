const polishCharsMap = new Map([
  ['ą', 'a'],
  ['ć', 'c'],
  ['ę', 'e'],
  ['ł', 'l'],
  ['ń', 'n'],
  ['ó', 'o'],
  ['ś', 's'],
  ['ź', 'z'],
  ['ż', 'z'],

  ['Ą', 'A'],
  ['Ć', 'C'],
  ['Ę', 'E'],
  ['Ł', 'L'],
  ['Ń', 'N'],
  ['Ó', 'O'],
  ['Ś', 'S'],
  ['Ź', 'Z'],
  ['Ż', 'Z'],
]);

export function diacriticsToASCII(str: string): string {
  return str.replace(/\W/g, (c) => {
    // tslint:disable-next-line:no-console
    if (polishCharsMap.has(c)) {
      return polishCharsMap.get(c) as string;
    } else {
      return c;
    }
  });
}
