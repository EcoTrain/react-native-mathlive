import {Atom, AtomJson, ToLatexOptions} from '../core/atom-class';
import type {MathstyleName} from '../core/mathstyle';
import type {Context, GlobalContext} from '../core/context';

export type GenfracOptions = {
  continuousFraction?: boolean;
  numerPrefix?: string;
  denomPrefix?: string;
  leftDelim?: string;
  rightDelim?: string;
  hasBarLine?: boolean;
  mathstyleName?: MathstyleName;
  style?: any;
  serialize?: (atom: GenfracAtom, options: ToLatexOptions) => string;
};

/**
 * Genfrac -- Generalized Fraction
 *
 * Decompose fractions, binomials, and in general anything made
 * of a numerator and denominator, optionally separated by a fraction bar,
 * and optionally surrounded by delimiters (parentheses, brackets, etc...).
 *
 * Depending on the type of fraction the mathstyle is either
 * displaystyle or textstyle. This value can also be set to 'auto',
 * to indicate it should use the current mathstyle
 */
export class GenfracAtom extends Atom {
  readonly hasBarLine: boolean;
  readonly leftDelim?: string;
  readonly rightDelim?: string;
  private readonly continuousFraction: boolean;
  private readonly numerPrefix?: string;
  private readonly denomPrefix?: string;
  private readonly mathstyleName?: MathstyleName;

  constructor(command: string, above: Atom[], below: Atom[], context: GlobalContext, options: GenfracOptions) {
    super('genfrac', context, {
      style: options.style,
      command,
      displayContainsHighlight: true,
    });
    this.above = above;
    this.below = below;
    this.hasBarLine = options?.hasBarLine ?? true;
    this.continuousFraction = options?.continuousFraction ?? false;
    this.numerPrefix = options?.numerPrefix;
    this.denomPrefix = options?.denomPrefix;
    this.mathstyleName = options?.mathstyleName;
    this.leftDelim = options?.leftDelim;
    this.rightDelim = options?.rightDelim;
  }

  static fromJson(json: AtomJson, context: GlobalContext): GenfracAtom {
    return new GenfracAtom(json.command, json.above, json.below, context, json as any as GenfracOptions);
  }

  toJson(): AtomJson {
    const options: GenfracOptions = {};
    if (this.continuousFraction) options.continuousFraction = true;
    if (this.numerPrefix) options.numerPrefix = this.numerPrefix;
    if (this.denomPrefix) options.denomPrefix = this.denomPrefix;
    if (this.leftDelim) options.leftDelim = this.leftDelim;
    if (this.rightDelim) options.rightDelim = this.rightDelim;
    if (!this.hasBarLine) options.hasBarLine = false;
    if (this.mathstyleName) options.mathstyleName = this.mathstyleName;
    return {...super.toJson(), ...options};
  }

  serialize(options: ToLatexOptions): string {
    return this.command + `{${this.aboveToLatex(options)}}` + `{${this.belowToLatex(options)}}`;
  }

  // The order of the children, which is used for keyboard navigation order,
  // may be customized for fractions...
  get children(): Atom[] {
    if (this._children) return this._children;

    const result: Atom[] = [];
    if (this.context.fractionNavigationOrder === 'numerator-denominator') {
      for (const x of this.above!) {
        result.push(...x.children);
        result.push(x);
      }
      for (const x of this.below!) {
        result.push(...x.children);
        result.push(x);
      }
    } else {
      for (const x of this.below!) {
        result.push(...x.children);
        result.push(x);
      }
      for (const x of this.above!) {
        result.push(...x.children);
        result.push(x);
      }
    }

    this._children = result;
    return result;
  }

  render(context: Context): any {
    console.log('GenFrac', {context});
    return null;
  }
}
