const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
] as const;

export type Letter = Union<typeof letters>;

export function isLetter(value?: unknown): value is Letter {
  if (!value) return false;
  if (typeof value !== 'string') return false;
  return (letters as readonly string[]).includes(value);
}
