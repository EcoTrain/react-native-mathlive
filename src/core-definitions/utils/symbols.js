export const MATH_SYMBOLS = {};

// RegExp for LaTeX commands
export const COMMAND_MODE_CHARACTERS = /[\w!@*()-=+{}[\]\\';:?/.,~<>`|$%#&^" ]/;

/**
 * @param symbol    The LaTeX command for this symbol, for
 * example `\alpha` or `+`
 */
function newSymbol(symbol, value, type = 'mord') {
  if (value === undefined) {
    return;
  }
  MATH_SYMBOLS[symbol] = {
    definitionType: 'symbol',
    type,
    codepoint: value,
  };
}

/**
 * Define a set of single-character symbols
 */
export function newSymbols(value, inType) {
  if (typeof value === 'string') {
    for (let i = 0; i < value.length; i++) {
      const ch = value.charAt(i);
      newSymbol(ch, ch.codePointAt(0));
    }
    return;
  }
  for (const [symbol, val, type] of value) {
    newSymbol(symbol, val, type ?? inType);
  }
}
