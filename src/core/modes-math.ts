/* eslint-disable no-new */
import {Atom, ToLatexOptions} from './atom';
import {Mode} from './modes-utils';
import type {GlobalContext} from './context';

// See http://ctan.math.illinois.edu/macros/latex/base/fntguide.pdf

export class MathMode extends Mode {
  constructor() {
    super('math');
  }

  createAtom(command: string, context: GlobalContext, style?: any): Atom {
    const info = context.getDefinition(command, 'math');
    if (info === null) {
      return new Atom('mord', context, {
        mode: 'math',
        command,
        value: command,
        style,
      });
    }
    if (info.definitionType === 'symbol') {
      const result = new Atom(info.type ?? 'mord', context, {
        mode: 'math',
        command: info.command ?? command,
        value: String.fromCodePoint(info.codepoint),
        style,
      });
      if (info.isFunction ?? false) result.isFunction = true;

      if (command.startsWith('\\')) result.verbatimLatex = command;
      return result;
    }
    const result = new Atom('mord', context, {
      mode: 'math',
      command: info.command ?? command,
      value: command,
      style,
    });
    if (info.isFunction ?? false) result.isFunction = true;

    if (command.startsWith('\\')) result.verbatimLatex = command;

    return result;
  }

  serialize(run: Atom[], options: ToLatexOptions): string {
    return '';
  }
}

// Singleton class
new MathMode();
