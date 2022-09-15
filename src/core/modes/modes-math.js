/* eslint-disable no-new */
import {Mode} from './modes-utils';
import {Atom} from '../atom';

export class MathMode extends Mode {
  constructor() {
    super('math');
  }

  createAtom(command, context) {
    const info = context.getDefinition(command, 'math');
    if (info === null) {
      return new Atom('mord', context, {
        mode: 'math',
        command,
        value: command,
      });
    }
    if (info.definitionType === 'symbol') {
      const result = new Atom(info.type ?? 'mord', context, {
        mode: 'math',
        command: info.command ?? command,
        value: String.fromCodePoint(info.codepoint),
      });
      if (info.isFunction ?? false) result.isFunction = true;

      if (command.startsWith('\\')) result.verbatimLatex = command;
      return result;
    }
    const result = new Atom('mord', context, {
      mode: 'math',
      command: info.command ?? command,
      value: command,
    });
    if (info.isFunction ?? false) result.isFunction = true;

    if (command.startsWith('\\')) result.verbatimLatex = command;

    return result;
  }

  serialize(run, options) {
    return '';
  }
}

// Singleton class
new MathMode();
