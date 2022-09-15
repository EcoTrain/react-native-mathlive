export const MATH_SYMBOLS = {};
export const LATEX_COMMANDS = {};

// Body-text symbols
// See http://ctan.mirrors.hoobly.com/info/symbols/comprehensive/symbols-a4.pdf, p14

export const TEXT_SYMBOLS = {
  ' ': 0x0020,
  '\\#': 0x0023,
  '\\&': 0x0026,
  '\\$': 0x0024,
  '\\%': 0x0025,
  '\\_': 0x005f,
  '\\euro': 0x20ac,
  '\\maltese': 0x2720,
  '\\{': 0x007b,
  '\\}': 0x007d,
  '\\nobreakspace': 0x00a0,
  '\\ldots': 0x2026,
  '\\textellipsis': 0x2026,
  '\\backslash': 0x005c,
  '`': 0x2018,
  "'": 0x2019,
  '``': 0x201c,
  "''": 0x201d,
  '\\degree': 0x00b0,
  '\\textasciicircum': 0x005e,
  '\\textasciitilde': 0x007e,
  '\\textasteriskcentered': 0x002a,
  '\\textbackslash': 0x005c,
  '\\textbraceleft': 0x007b,
  '\\textbraceright': 0x007d,
  '\\textbullet': 0x2022,
  '\\textdollar': 0x0024,
  '\\textsterling': 0x00a3,
  '\\textdagger': 0x2020,
  '\\textdaggerdbl': 0x2021,

  '–': 0x2013, // EN DASH
  '—': 0x2014, // EM DASH
  '‘': 0x2018, // LEFT SINGLE QUOTATION MARK
  '’': 0x2019, // RIGHT SINGLE QUOTATION MARK
  '“': 0x201c, // LEFT DOUBLE QUOTATION MARK
  '”': 0x201d, // RIGHT DOUBLE QUOTATION MARK
  '"': 0x201d, // DOUBLE PRIME
};

export const COMMAND_MODE_CHARACTERS = /[\w!@*()-=+{}[\]\\';:?/.,~<>`|$%#&^" ]/;

export const LETTER = new RegExp('\\p{Letter}', 'u');
export const LETTER_AND_DIGITS = new RegExp('[0-9\\p{Letter}]', 'u');
/**
 * @param symbol    The LaTeX command for this symbol, for
 * example `\alpha` or `+`
 */
function newSymbol(symbol, value, type = 'mord') {
  if (value === undefined) return;
  MATH_SYMBOLS[symbol] = {
    definitionType: 'symbol',
    type,
    codepoint: value,
  };

  // We accept all math symbols in text mode as well
  // which is a bit more permissive than TeX
  if (!TEXT_SYMBOLS[symbol]) TEXT_SYMBOLS[symbol] = value;
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
  for (const [symbol, val, type] of value) newSymbol(symbol, val, type ?? inType);
}

/**
 * Define a set of single-character symbols as a range of Unicode codepoints
 * @param from First Unicode codepoint
 * @param to Last Unicode codepoint
 */
export function newSymbolRange(from, to) {
  for (let i = from; i <= to; i++) newSymbol(String.fromCodePoint(i), i);
}

/**
 * An argument template has the following syntax:
 *
 * <placeholder>:<type>
 *
 * where
 * - <placeholder> is a string whose value is displayed when the argument
 *   is missing
 * - <type> is one of 'string', 'color', 'dimen', 'auto', 'text', 'math'
 *
 */
function parseParameterTemplateArgument(argTemplate) {
  let type = 'auto';

  // Parse the type (:type)
  const r = argTemplate.match(/:([^=]+)/);
  if (r) type = r[1].trim();

  return type;
}

function parseParameterTemplate(parameterTemplate) {
  if (!parameterTemplate) return [];

  const result = [];
  let parameters = parameterTemplate.split(']');
  if (parameters[0].startsWith('[')) {
    // We found at least one optional parameter.
    result.push({
      isOptional: true,
      type: parseParameterTemplateArgument(parameters[0].slice(1)),
    });
    // Parse the rest
    for (let i = 1; i <= parameters.length; i++) result.push(...parseParameterTemplate(parameters[i]));
  } else {
    parameters = parameterTemplate.split('}');
    if (parameters[0].startsWith('{')) {
      // We found a required parameter
      result.push({
        isOptional: false,
        type: parseParameterTemplateArgument(parameters[0].slice(1)),
      });
      // Parse the rest
      for (let i = 1; i <= parameters.length; i++) result.push(...parseParameterTemplate(parameters[i]));
    }
  }

  return result;
}

/**
 * Define one of more functions.
 *
 * @param names
 * @param parameters The number and type of required and optional parameters.
 * For example: '{}' defines a single mandatory parameter
 * '[string]{auto}' defines two params, one optional, one required
 */
export function defineFunction(names, parameters, options) {
  if (!options) options = {};

  // Set default values of functions
  const data = {
    definitionType: 'function',
    params: parseParameterTemplate(parameters),

    ifMode: options.ifMode,
    isFunction: options.isFunction ?? false,
    applyMode: options.applyMode,
    infix: options.infix ?? false,
    createAtom: options.createAtom,
  };
  if (typeof names === 'string') LATEX_COMMANDS['\\' + names] = data;
  else for (const name of names) LATEX_COMMANDS['\\' + name] = data;
}
