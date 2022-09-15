/* eslint-disable no-new */
import {Mode} from './modes-utils';
import type {Atom, ToLatexOptions} from './atom';
import type {GlobalContext} from './context';

import {LatexAtom} from '../core-atoms/latex';

export class LatexMode extends Mode {
  constructor() {
    super('latex');
  }

  createAtom(command: string, context: GlobalContext, _style?: any): Atom | null {
    return new LatexAtom(command, context);
  }

  serialize(run: Atom[], _options: ToLatexOptions): string {
    return run
      .filter(x => x instanceof LatexAtom && !x.isSuggestion)
      .map(x => x.value)
      .join('');
  }
}

new LatexMode();
