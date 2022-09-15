import type {ParseMode} from '../public/core';

import {Atom, AtomJson, ToLatexOptions} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';

export class CompositionAtom extends Atom {
  constructor(value: string, context: GlobalContext, options?: {mode: ParseMode}) {
    super('composition', context, {mode: options?.mode ?? 'math', value});
  }

  static fromJson(json: {[key: string]: any}, context: GlobalContext): CompositionAtom {
    return new CompositionAtom(json.value, context, json as any);
  }

  toJson(): AtomJson {
    return super.toJson();
  }

  get computedStyle(): any {
    return {};
  }

  render(context: Context): any {
    return null;
  }

  serialize(_options: ToLatexOptions): string {
    return '';
  }
}
