import {Atom, AtomJson, ToLatexOptions} from '../core/atom-class';
import type {Box} from '../core/box';
import type {Context, GlobalContext} from '../core/context';

/**
 *  \left....\right
 *
 * Note that we can encounter malformed \left...\right, for example
 * a \left without a matching \right or vice versa. In that case, the
 * leftDelim (resp. rightDelim) will be undefined. We still need to handle
 * those cases.
 *
 */
export class LeftRightAtom extends Atom {
  leftDelim?: string;
  rightDelim?: string;

  // Indicate which command should the delimiters be serialized to:
  // regular delimiter, `\left...\right` or `\mleft...mright`.
  constructor(
    body: Atom[],
    context: GlobalContext,
    options: {
      leftDelim: string;
      rightDelim: string;
      style?: any;
    }
  ) {
    super('leftright', context, {
      style: options.style,
      displayContainsHighlight: true,
    });
    this.body = body;
    this.leftDelim = options.leftDelim;
    this.rightDelim = options.rightDelim;
  }

  static fromJson(json: AtomJson, context: GlobalContext): any {
    // return new LeftRightAtom(json.variant ?? '', json.body, context, json as any);
  }

  toJson(): AtomJson {
    const result = super.toJson();
    if (this.leftDelim) result.leftDelim = this.leftDelim;
    if (this.rightDelim) result.rightDelim = this.rightDelim;
    return result;
  }

  serialize(options: ToLatexOptions): string {
    return '';
  }

  render(parentContext: Context): Box | null {
    return null;
  }
}
