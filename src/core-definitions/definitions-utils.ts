import type {ArgumentType} from '../core/parser';
import type {Atom, AtomType, BBoxParameter} from '../core/atom-class';
import type {GlobalContext, PrivateStyle} from '../core/context';
import type {MathstyleName} from '../core/mathstyle';

import type {Dimension, ParseMode} from 'src/public/core';

export type FunctionArgumentDefinition = {
  isOptional: boolean;
  type: ArgumentType;
};

export type Argument = string | number | Dimension | BBoxParameter | Atom[] | null;

export type ParseResult =
  | Atom
  | PrivateStyle
  | ParseMode
  | MathstyleName
  | {
      error: string;
    };

export type TokenDefinition = FunctionDefinition | SymbolDefinition;

export type FunctionDefinition = {
  definitionType: 'function';
  command?: string;
  params: FunctionArgumentDefinition[];
  /** Infix commands are generally deprecated in LaTeX, but there are
   * a few that we might encounter (e.g. \choose).
   */
  infix: boolean;
  /** If true, the command should be considered a function name, e.g. `\sin` */
  isFunction: boolean;
  /** The mode in which this command can be used */
  ifMode?: ParseMode;
  /**  */
  applyMode?: ParseMode;
  createAtom?: (command: string, args: (null | Argument)[], style: PrivateStyle, context: GlobalContext) => Atom;

  frequency?: number;
  category?: string;
  template?: string;
};

export type SymbolDefinition = {
  definitionType: 'symbol';
  command?: string;
  type: AtomType;
  codepoint: number;

  isFunction?: boolean;

  frequency?: number;
  category?: string;
  template?: string;
};

export const MATH_SYMBOLS: Record<string, SymbolDefinition> = {};

// Map a character to some corresponding LaTeX.
//
// This is used for some characters such as ² SUPERSCRIPT TWO.
// This is also an opportunity to specify the preferred form when
// a unicode character is encountered that maps to multiple commands,
// for example ≠ could map either to \ne or \neq.
// The table will also be populated by any registered symbol from MATH_SYMBOLS,
//  so an explicit entry is only needed in case of ambiguous mappings.
//
// prettier-ignore
const REVERSE_MATH_SYMBOLS: any = {
    0x003C: '\\lt',
    0x003E: '\\gt',
    0x006F: 'o',    // Also \omicron
    0x0026: '\\&',  // Also \And
    0x007B: '\\lbrace',
    0x007D: '\\rbrace',
    0x005B: '\\lbrack',
    0x005D: '\\rbrack',
    0x003A: '\\colon', // Also :
    
    0x00A0: '~', // Also \space
    0x00AC: '\\neg',  // Also \lnot

    0x00B7: '\\cdot',
    0x00BC: '\\frac{1}{4}',
    0x00BD: '\\frac{1}{2}',
    0x00BE: '\\frac{3}{4}',
    0x2070: '^{0}',
    0x2071: '^{i}',
    0x00B9: '^{1}',
    0x00B2: '^{2}',
    0x00B3: '^{3}',

    0x2020: '\\dagger', // Also \dag
    0x2021: '\\ddagger', // Also \ddag
    0x2026: '\\ldots',    // Also \mathellipsis

    0x2074: '^{4}',
    0x2075: '^{5}',
    0x2076: '^{6}',
    0x2077: '^{7}',
    0x2078: '^{8}',
    0x2079: '^{9}',
    0x207A: '^{+}',
    0x207B: '^{-}',
    0x207C: '^{=}',
    0x207F: '^{n}',
    0x2080: '_{0}',
    0x2081: '_{1}',
    0x2082: '_{2}',
    0x2083: '_{3}',
    0x2084: '_{4}',
    0x2085: '_{5}',
    0x2086: '_{6}',
    0x2087: '_{7}',
    0x2088: '_{8}',
    0x2089: '_{9}',
    0x208A: '_{+}',
    0x208B: '_{-}',
    0x208C: '_{=}',
    0x2090: '_{a}',
    0x2091: '_{e}',
    0x2092: '_{o}',
    0x2093: '_{x}',

    0x2032: '\\prime',
    0x0027: '\\prime',

    0x2190: '\\gets', // Also \leftarrow
    0x2192: '\\to',   // Also \rightarrow

    0x25B3: '\\triangle', // Also \bigtriangleup, \vartriangle
    0x25BD: '\\triangledown',

    0x220B: '\\owns', // Also \ni
    0x2217: '\\ast',  // Also *
    0x2223: '\\vert',  // Also |, \mvert, \lvert, \rvert
    0x2225: '\\Vert',  // Also \parallel \shortparallel

    0x2227: '\\land', // Also \wedge
    0x2228: '\\lor', // Also \vee

    0x22C5: '\\cdot', // Also \centerdot, \cdotp
    0x22C8: '\\bowtie', // Also \Joint

    0x2260: '\\ne',   // Also \neq
    0x2264: '\\le',   // Also \leq
    0x2265: '\\ge',   // Also \geq
    0x22A5: '\\bot', // Also \perp

    0x27F7: '\\biconditional',    // Also \longleftrightarrow
    0x27F8: '\\impliedby', // Also \Longleftarrow
    0x27F9: '\\implies', // Also \Longrightarrow
    0x27fa: '\\iff',

    0x2102: '\\mathbb{C}',    // Also \doubleStruckCapitalC
    0x2115: '\\mathbb{N}',    // Also \doubleStruckCapitalN
    0x2119: '\\mathbb{P}',    // Also \doubleStruckCapitalP
    0x211A: '\\mathbb{Q}',    // Also \doubleStruckCapitalQ
    0x211D: '\\mathbb{R}',    // Also \doubleStruckCapitalR
    0x2124: '\\mathbb{Z}',    // Also \doubleStruckCapitalZ
    0x210d: '\\mathbb{H}',

    0x211c: '\\Re',
    0x2111: '\\Im',
    0x002A: '\\ast',


    0x2b1c: '\\square',
    0x25a1: '\\square',
    0x2210: '\\coprod',
    0x220c: '\\not\\ni',
    0x25c7: '\\diamond',
    0x228e: '\\uplus',
    0x2293: '\\sqcap',
    0x2294: '\\sqcup',
    0x2240: '\\wr',
    0x222e: '\\oint',
    0x2022: '\\textbullet',
    0x2212: '-',

    0x03d2 : '\\Upsilon',
};
export const LATEX_COMMANDS: Record<string, FunctionDefinition> = {};

// Body-text symbols
// See http://ctan.mirrors.hoobly.com/info/symbols/comprehensive/symbols-a4.pdf, p14

export const TEXT_SYMBOLS: Record<string, number> = {
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
  '\\ss': 0x00df, // LATIN SMALL LETTER SHARP S
  '\\ae': 0x00e6, // LATIN SMALL LETTER AE
  '\\oe': 0x0153, // LATIN SMALL LIGATURE OE
  '\\AE': 0x00c6, // LATIN CAPITAL LETTER AE
  '\\OE': 0x0152, // LATIN CAPITAL LIGATURE OE
  '\\O': 0x00d8, // LATIN CAPITAL LETTER O WITH STROKE
  '\\i': 0x0131, // LATIN SMALL LETTER DOTLESS I
  '\\j': 0x0237, // LATIN SMALL LETTER DOTLESS J
  '\\aa': 0x00e5, // LATIN SMALL LETTER A WITH RING ABOVE
  '\\AA': 0x00c5, // LATIN CAPITAL LETTER A WITH RING ABOVE
};

export const COMMAND_MODE_CHARACTERS = /[\w!@*()-=+{}[\]\\';:?/.,~<>`|$%#&^" ]/;

export const LETTER = new RegExp('\\p{Letter}', 'u');
export const LETTER_AND_DIGITS = new RegExp('[0-9\\p{Letter}]', 'u');
/**
 * @param symbol    The LaTeX command for this symbol, for
 * example `\alpha` or `+`
 */
function newSymbol(symbol: string, value: number | undefined, type: AtomType = 'mord'): void {
  if (value === undefined) return;
  MATH_SYMBOLS[symbol] = {
    definitionType: 'symbol',
    type,
    codepoint: value,
  };
  if (!REVERSE_MATH_SYMBOLS[value]) REVERSE_MATH_SYMBOLS[value] = symbol;

  // We accept all math symbols in text mode as well
  // which is a bit more permissive than TeX
  if (!TEXT_SYMBOLS[symbol]) TEXT_SYMBOLS[symbol] = value;
}

/**
 * Define a set of single-character symbols
 */
export function newSymbols(
  value: string | [symbol: string, codepoint: number, type?: AtomType][],
  inType?: AtomType
): void {
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
export function newSymbolRange(from: number, to: number): void {
  for (let i = from; i <= to; i++) newSymbol(String.fromCodePoint(i), i);
}

/**
 * Given a codepoint, return a matching LaTeX expression.
 * If there is a matching command (e.g. `\alpha`) it is returned.
 */
export function charToLatex(parseMode: ArgumentType, codepoint: number | undefined): string {
  if (codepoint === undefined) return '';
  if (parseMode === 'math' && REVERSE_MATH_SYMBOLS[codepoint]) return REVERSE_MATH_SYMBOLS[codepoint];

  if (parseMode === 'text') {
    let textSymbol = Object.keys(TEXT_SYMBOLS).find(x => TEXT_SYMBOLS[x] === codepoint);
    if (!textSymbol) {
      const hex = codepoint.toString(16);
      textSymbol = '^'.repeat(hex.length) + hex;
    }

    return textSymbol;
  }

  return String.fromCodePoint(codepoint);
}

/* Some symbols in the MATHEMATICAL ALPHANUMERICAL SYMBOLS block had
   been previously defined in other blocks. Remap them */
const MATH_LETTER_EXCEPTIONS: any = {
  0x1d455: 0x0210e,
  0x1d49d: 0x0212c,
  0x1d4a0: 0x02130,
  0x1d4a1: 0x02131,
  0x1d4a3: 0x0210b,
  0x1d4a4: 0x02110,
  0x1d4a7: 0x02112,
  0x1d4a8: 0x02133,
  0x1d4ad: 0x0211b,
  0x1d4ba: 0x0212f,
  0x1d4bc: 0x0210a,
  0x1d4c4: 0x02134,
  0x1d506: 0x0212d,
  0x1d50b: 0x0210c,
  0x1d50c: 0x02111,
  0x1d515: 0x0211c,
  0x1d51d: 0x02128,
  0x1d53a: 0x02102,
  0x1d53f: 0x0210d,
  0x1d545: 0x02115,
  0x1d547: 0x02119,
  0x1d548: 0x0211a,
  0x1d549: 0x0211d,
  0x1d551: 0x02124,
};

function unicodeToMathVariant(codepoint: number): {
  char: string;
  style?: string;
} {
  if ((codepoint < 0x1d400 || codepoint > 0x1d7ff) && (codepoint < 0x2100 || codepoint > 0x214f))
    return {char: String.fromCodePoint(codepoint)};

  // Handle the 'gap' letters by converting them back into their logical range
  for (const c in MATH_LETTER_EXCEPTIONS) {
    if (MATH_LETTER_EXCEPTIONS[c] === codepoint) {
      codepoint = c.codePointAt(0) ?? 0;
      break;
    }
  }

  return {char: String.fromCodePoint(codepoint)};
}

/**
 * Return an array of suggestion for completing string 's'.
 * For example, for '\si', it could return ['\sin', '\sinh', '\sim', 'simeq', '\sigma']
 * Infix operators are excluded, since they are deprecated commands.
 */
export function suggest(s: string): string[] {
  if (s === '\\') return [];
  if (!s.startsWith('\\')) return [];

  const result: {match: string; frequency: number}[] = [];

  // Iterate over items in the dictionary
  for (const p in LATEX_COMMANDS) {
    // Don't recommend infix commands
    if (p.startsWith(s) && !LATEX_COMMANDS[p]!.infix)
      result.push({match: p, frequency: LATEX_COMMANDS[p]!.frequency ?? 0});
  }

  for (const p in MATH_SYMBOLS) {
    if (p.startsWith(s)) result.push({match: p, frequency: MATH_SYMBOLS[p]!.frequency ?? 0});
  }

  result.sort((a, b) => {
    if (a.frequency === b.frequency) {
      if (a.match.length === b.match.length) return a.match < b.match ? -1 : +1;

      return a.match.length - b.match.length;
    }

    return (b.frequency ?? 0) - (a.frequency ?? 0);
  });

  return result.map(x => x.match);
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
function parseParameterTemplateArgument(argTemplate: string): ArgumentType {
  let type: ArgumentType = 'auto';

  // Parse the type (:type)
  const r = argTemplate.match(/:([^=]+)/);
  if (r) type = r[1]!.trim() as ArgumentType;

  return type;
}

function parseParameterTemplate(parameterTemplate: string): FunctionArgumentDefinition[] {
  if (!parameterTemplate) return [];

  const result: FunctionArgumentDefinition[] = [];
  let parameters = parameterTemplate.split(']');
  if (parameters[0]!.startsWith('[')) {
    // We found at least one optional parameter.
    result.push({
      isOptional: true,
      type: parseParameterTemplateArgument(parameters[0]!.slice(1)),
    });
    // Parse the rest
    for (let i = 1; i <= parameters.length; i++) result.push(...parseParameterTemplate(parameters[i]!));
  } else {
    parameters = parameterTemplate.split('}');
    if (parameters[0]!.startsWith('{')) {
      // We found a required parameter
      result.push({
        isOptional: false,
        type: parseParameterTemplateArgument(parameters[0]!.slice(1)),
      });
      // Parse the rest
      for (let i = 1; i <= parameters.length; i++) result.push(...parseParameterTemplate(parameters[i]!));
    }
  }

  return result;
}

/**
 * If possible, i.e. if they are all simple atoms, return a string made up of
 * their body
 */
export function parseArgAsString(atoms: Atom[]): string {
  if (!atoms) return '';
  let result = '';
  let success = true;
  for (const atom of atoms) {
    if (typeof atom.value === 'string') result += atom.value;
    else success = false;
  }
  return success ? result : '';
}

/**
 * Define one of more functions.
 *
 * @param names
 * @param parameters The number and type of required and optional parameters.
 * For example: '{}' defines a single mandatory parameter
 * '[string]{auto}' defines two params, one optional, one required
 */
export function defineFunction(
  names: string | string[],
  parameters: string,
  options: {
    ifMode?: ParseMode;
    applyMode?: ParseMode;
    infix?: boolean;
    isFunction?: boolean;
    createAtom?: (name: string, args: (null | Argument)[], style: PrivateStyle, context: GlobalContext) => Atom;
    command?: string;
  }
): void {
  if (!options) options = {};

  // Set default values of functions
  const data: FunctionDefinition = {
    definitionType: 'function',
    // The parameters for this function, an array of
    // {optional, type}
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
