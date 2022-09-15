/* eslint-disable no-new */
import {TextAtom} from '../core-atoms/text';

import type {Atom, ToLatexOptions} from './atom';
import {Mode} from './modes-utils';
import type {GlobalContext} from './context';

export class TextMode extends Mode {
  constructor() {
    super('text');
  }

  createAtom(command: string, context: GlobalContext, style?: any): Atom | null {
    const info = context.getDefinition(command, 'text');
    if (!info) return null;
    if (info.definitionType === 'symbol') {
      return new TextAtom(command, String.fromCodePoint(info.codepoint), style ?? {}, context);
    }
    return null;
  }

  serialize(run: Atom[], options: ToLatexOptions): string {
    return '';
  }
}

// Singleton class
new TextMode();
