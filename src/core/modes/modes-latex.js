/* eslint-disable no-new */
import {Mode} from './modes-utils';
import {LatexAtom} from '../../core-atoms/latex';

export class LatexMode extends Mode {
  constructor() {
    super('latex');
  }

  createAtom(command, context, _style) {
    return new LatexAtom(command, context);
  }

  serialize(run, _options) {
    return run
      .filter(x => x instanceof LatexAtom && !x.isSuggestion)
      .map(x => x.value)
      .join('');
  }
}

new LatexMode();
