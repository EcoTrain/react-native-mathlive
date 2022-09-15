/* eslint-disable no-new */
import {Mode} from './modes-utils';
import {TextAtom} from '../../core-atoms/text';

export class TextMode extends Mode {
  constructor() {
    super('text');
  }

  createAtom(command, context) {
    const info = context.getDefinition(command, 'text');
    if (!info) return null;
    if (info.definitionType === 'symbol') {
      return new TextAtom(command, String.fromCodePoint(info.codepoint), context);
    }
    return null;
  }

  serialize(run, options) {
    return '';
  }
}

// Singleton class
new TextMode();
