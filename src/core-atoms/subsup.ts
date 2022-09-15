import {Atom, AtomJson, NAMED_BRANCHES, ToLatexOptions} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';

export class SubsupAtom extends Atom {
  constructor(context: GlobalContext, options?: {style?: any}) {
    super('msubsup', context, {style: options?.style});
  }

  static fromJson(json: {[key: string]: any}, context: GlobalContext): SubsupAtom {
    const result = new SubsupAtom(context, json as any);
    for (const branch of NAMED_BRANCHES) if (json[branch]) result.setChildren(json[branch], branch);

    return result;
  }

  toJson(): AtomJson {
    return super.toJson();
  }

  render(context: Context): any {
    return null;
  }

  serialize(options: ToLatexOptions): string {
    return this.supsubToLatex(options);
  }
}
