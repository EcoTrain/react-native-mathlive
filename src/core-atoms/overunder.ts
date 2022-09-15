import {Atom, AtomJson, ToLatexOptions} from '../core/atom-class';
import type {Box, BoxType} from '../core/box';
import type {Context, GlobalContext, PrivateStyle} from '../core/context';

// An `overunder` atom has the following attributes:
// - body: atoms[]: atoms displayed on the base line
// - svgBody: string. A SVG graphic displayed on the base line (if present, the body is ignored)
// - above: atoms[]: atoms displayed above the body
// - svgAbove: string. A named SVG graphic above the element
// - below: atoms[]: atoms displayed below the body
// - svgBelow: string. A named SVG graphic below the element
export class OverunderAtom extends Atom {
  svgAbove?: string;
  svgBelow?: string;
  svgBody?: string;
  boxType: BoxType;
  paddedBody: boolean;
  paddedLabels: boolean;
  constructor(
    command: string,
    context: GlobalContext,
    options: {
      body?: Atom[];
      above?: Atom[];
      below?: Atom[];
      svgBody?: string;
      svgAbove?: string;
      svgBelow?: string;
      skipBoundary?: boolean;
      style: PrivateStyle;
      boxType?: BoxType;
      supsubPlacement?: 'over-under' | 'adjacent';
      paddedBody?: boolean;
      paddedLabels?: boolean;
      serialize?: (atom: OverunderAtom, options: ToLatexOptions) => string;
    }
  ) {
    super('overunder', context, {
      command,
      style: options.style,
    });
    this.skipBoundary = options.skipBoundary ?? true;
    this.subsupPlacement = options.supsubPlacement;

    this.body = options.body;
    this.svgAbove = options.svgAbove;
    this.svgBelow = options.svgBelow;
    this.svgBody = options.svgBody;
    this.above = options.above;
    this.below = options.below;
    this.boxType = options.boxType ?? 'mord';
    this.paddedBody = options.paddedBody ?? false;
    this.paddedLabels = options.paddedLabels ?? false;
  }

  static fromJson(json: AtomJson, context: GlobalContext): OverunderAtom {
    return new OverunderAtom(json.command, context, json as any);
  }

  toJson(): AtomJson {
    const options: {[key: string]: any} = {};
    if (!this.skipBoundary) options.skipBoundary = false;
    if (this.subsupPlacement) options.subsupPlacement = this.subsupPlacement;
    if (this.svgAbove) options.svgAbove = this.svgAbove;
    if (this.svgBelow) options.svgBelow = this.svgBelow;
    if (this.svgBody) options.svgBody = this.svgBody;
    if (this.boxType !== 'mord') options.boxType = this.boxType;
    if (this.paddedBody) options.paddedBody = true;
    if (this.paddedLabels) options.paddedLabels = true;
    return {...super.toJson(), ...options};
  }

  /**
   * Combine a base with an atom above and an atom below.
   *
   * See http://tug.ctan.org/macros/latex/required/amsmath/amsmath.dtx
   *
   * > \newcommand{\overset}[2]{\binrel@{#2}%
   * > \binrel@@{\mathop{\kern\z@#2}\limits^{#1}}}
   *
   */

  render(parentContext: Context): Box | null {
    return null;
  }
}
