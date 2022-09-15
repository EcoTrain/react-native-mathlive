import {Atom, AtomJson} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';

/*
 * An atom representing a syntactic error, such as an unknown command
 */
export class ErrorAtom extends Atom {
  constructor(value: string, context: GlobalContext) {
    super('error', context, {value, command: value, mode: 'math'});
    this.verbatimLatex = value;
  }

  static fromJson(json: AtomJson, context: GlobalContext): ErrorAtom {
    return new ErrorAtom(json.command, context);
  }

  toJson(): AtomJson {
    return super.toJson();
  }

  render(context: Context): any {
    return null;
  }
}
