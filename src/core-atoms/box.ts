import {Atom, AtomJson, ToLatexOptions} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';

export class BoxAtom extends Atom {
  readonly padding?: string;
  readonly border?: string;

  constructor(
    command: string,
    body: Atom[],
    context: GlobalContext,
    options: {
      padding?: string;
      border?: string;
      style: any;
      serialize?: (atom: BoxAtom, options: ToLatexOptions) => string;
    }
  ) {
    super('box', context, {
      command,
      serialize: options.serialize,
      style: options.style,
    });
    this.body = body;

    this.padding = options.padding;
    this.border = options.border;
  }

  static fromJson(json: {[key: string]: any}, context: GlobalContext): BoxAtom {
    return new BoxAtom(json.command, json.body, context, json as any);
  }

  toJson(): AtomJson {
    return {
      ...super.toJson(),
      padding: this.padding,
      border: this.border,
    };
  }

  render(parentContext: Context): any {
    return null;
  }
}
