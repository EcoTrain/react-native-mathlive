export function stringToCodepoints(string) {
  const result = [];
  for (let i = 0; i < string.length; i++) {
    let code = string.charCodeAt(i);
    if (code === 0x0d && string.charCodeAt(i + 1) === 0x0a) {
      code = 0x0a;
      i++;
    }

    if (code === 0x0d || code === 0x0c) code = 0x0a;
    if (code === 0x00) code = 0xfffd;

    // Decode a surrogate pair into an astral codepoint.
    if (code >= 0xd800 && code <= 0xdbff) {
      const nextCode = string.charCodeAt(i + 1);
      if (nextCode >= 0xdc00 && nextCode <= 0xdfff) {
        const lead = code - 0xd800;
        const trail = nextCode - 0xdc00;
        code = 2 ** 16 + lead * 2 ** 10 + trail;
        // N = ((H - 0xD800) * 0x400) + (L - 0xDC00) + 0x10000;
        i++;
      }
    }

    result.push(code);
  }

  return result;
}

const ZWJ = 0x200d; // Zero-width joiner

// const ZWSP = 0x200b; // Zero-width space

/**
 * Return a string or an array of graphemes.
 * This includes:
 * - emoji with skin and hair modifiers
 * - emoji combination (for example "female pilot")
 * - text emoji with an emoji presentation style modifier
 *      - U+1F512 U+FE0E 🔒︎
 *      - U+1F512 U+FE0F 🔒️
 * - flags represented as two regional indicator codepoints
 * - flags represented as a flag emoji + zwj + an emoji tag
 * - other combinations (for example, rainbow flag)
 */

export function splitGraphemes(string) {
  // If it's all ASCII, short-circuit the grapheme splitting...
  if (/^[\u0020-\u00FF]*$/.test(string)) return string;

  const result = [];

  const codePoints = stringToCodepoints(string);
  let index = 0;
  while (index < codePoints.length) {
    const code = codePoints[index++];

    const next = codePoints[index];
    // Combine sequences
    if (next === ZWJ) {
      // Zero-width joiner sequences are:
      // ZWJ_SEQUENCE := (CHAR + ZWJ)+
      const baseIndex = index - 1;
      index += 2;
      while (codePoints[index] === ZWJ) index += 2;

      result.push(String.fromCodePoint(...codePoints.slice(baseIndex, index - baseIndex + 1)));
    } else result.push(String.fromCodePoint(code || 0x00));
  }

  return result;
}
