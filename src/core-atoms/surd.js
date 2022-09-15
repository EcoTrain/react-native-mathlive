import {Atom} from '../core/atom';

export class SurdAtom extends Atom {
  constructor(command, context, options) {
    super('surd', context, {
      command,
      mode: options.mode ?? 'math',
      displayContainsHighlight: true,
    });
    this.body = options.body;
    this.above = options.index;
  }

  serialize(options) {
    let args = '';
    if (this.above) args += `[${this.aboveToLatex(options)}]`;

    args += `{${this.bodyToLatex(options)}}`;
    return this.command + args;
  }

  render(parentContext) {
    return null;
  }
}
