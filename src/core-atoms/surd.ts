import {Atom, AtomJson, ToLatexOptions} from '../core/atom-class';
import type {Context, GlobalContext} from '../core/context';

export class SurdAtom extends Atom {
  constructor(command: any, context: any, options: any) {
    super('surd', context, {
      command,
      mode: options.mode ?? 'math',
      style: options.style,
      displayContainsHighlight: true,
    });
    this.body = options.body;
    this.above = options.index;
  }

  static fromJson(json: AtomJson, context: GlobalContext): SurdAtom {
    return new SurdAtom(json.command, context, {
      ...(json as any),
      index: json.above,
    });
  }

  toJson(): AtomJson {
    return super.toJson();
  }

  serialize(options: ToLatexOptions): string {
    let args = '';
    if (this.above) args += `[${this.aboveToLatex(options)}]`;

    args += `{${this.bodyToLatex(options)}}`;
    return this.command + args;
  }

  render(parentContext: Context): any {
    return null;
  }
}
