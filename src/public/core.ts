/**
 * The mode that indicates how a portion of content is interpreted
 *
 */
export type ParseMode = 'math' | 'text' | 'latex';

/**
 * Error code passed to the [[`ErrorListener`]] function.
 *
 * See [[`MathfieldOptions`]], [[`convertLatexToMarkup`]]
 *
 *
    |  | |
    | ------------------ | ---      |
    | `unknown-command`             | There is no definition available for this LaTeX command, e.g. `\zin`  |
    | `unknown-environment`         | There is no definition available for this environment, e.g. `\begin{foo}`  |
    | `invalid-command`             | This command is not valid in the current context (e.g. text command in math mode)  |
    | `unbalanced-braces`           |  There are too many or too few `{` or `}`  |
    | `unbalanced-environment`      |  An environment was open but never closed (`\begin{array}`) or the `\end` command does not match the `\begin` command (`\begin{array*}\end{array}`)  |
    | `unbalanced-mode-shift`       |  A `$`, `$$`, `\(` or `\[` was not balanced  |
    | `missing-argument`            |  A required argument is missing, e.g. `\frac{2}` |
    | `too-many-infix-commands`     | A group can include only one infix command (i.e. `\choose`, `\atop`). In general it's best to avoid infix commands.  |
    | `unexpected-command-in-string`| A command expected a string argument, but there was a command instead  |
    | `missing-unit`                |  An argument requiring a dimension was missing an unit.  |
    | `unexpected-delimiter`        |  An invalid symbol or command was used as a delimiter.  |
    | `unexpected-token`            |  An unexpected character was encountered.  |
    | `unexpected-end-of-string`    |  The end of the string was reached, but some required arguments were missing. |
    | `improper-alphabetic-constant`    | The alphabetic constant prefix `` ` `` was not followed by a letter or single character command. |
 */
export type ParserErrorCode =
  | 'unknown-command'
  | 'invalid-command'
  | 'unbalanced-braces'
  | 'unknown-environment'
  | 'unbalanced-environment'
  | 'unbalanced-mode-shift'
  | 'missing-argument'
  | 'too-many-infix-commands'
  | 'unexpected-command-in-string'
  | 'missing-unit'
  | 'unexpected-delimiter'
  | 'unexpected-token'
  | 'unexpected-end-of-string'
  | 'improper-alphabetic-constant';

// See https://ww2.eng.famu.fsu.edu/~dommelen/l2h/errors.html
// for a reference of TeX errors.

export type LatexSyntaxError<T = ParserErrorCode> = {
  code: T;
  arg?: string;
  latex?: string;
  before?: string;
  after?: string;
};

export type ErrorListener<T = ParserErrorCode> = (err: LatexSyntaxError<T>) => void;

export type FontShape = 'auto' | 'n' | 'it' | 'sl' | 'sc' | '';

export type FontSeries = 'auto' | 'm' | 'b' | 'l' | '';

export type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Use a `Style` object  literal to modify the visual appearance of a
 * mathfield or a portion of a mathfield.
 *
 * the font variant, weight (`FontSeries`), size and more.
 *
 * **See Also**
 * * [`applyStyle`](http://cortexjs.io/docs/mathlive/?q=applyStyle)
 * * [Interacting with a Mathfield](/mathlive/guides/interacting/)
 */

export interface Style {
  fontFamily?: string;
  fontShape?: FontShape;
  fontSeries?: FontSeries;
  fontSize?: FontSize | 'auto';
  letterShapeStyle?: 'tex' | 'french' | 'iso' | 'upright' | 'auto';
}

/**
 *
 */
export type DimensionUnit =
  | 'pt'
  | 'mm'
  | 'cm'
  | 'ex'
  | 'px'
  | 'em'
  | 'bp'
  | 'dd'
  | 'pc'
  | 'in'
  | 'mu'
  | 'fil'
  | 'fill'
  | 'filll';

/**
 * A dimension is used to specify the size of things
 *
 */
export type Dimension = {
  dimension: number;
  unit?: DimensionUnit; // If missing, assumes 'pt'
};

export type RegisterValue = Dimension | number | string;

/**
 * TeX registers represent 'variables' and 'constants'.
 *
 * Changing the values of some registers can modify the layout
 * of math expressions.
 *
 * The following registers might be of interest:
 *
 * - `thinmuskip`
 * - `medmuskip`
 * - `thickmuskip`
 * - `nulldelimiterspace`
 * - `delimitershortfall`
 * - `jot`
 */
export type Registers = Record<string, RegisterValue>;
