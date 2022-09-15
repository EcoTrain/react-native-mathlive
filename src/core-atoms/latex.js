import {Atom} from '../core/atom';

/**
 * Atom for raw latex character, while in LaTeX editing mode
 */
export class LatexAtom extends Atom {
  constructor(value, context, options) {
    super('latex', context, {value, mode: 'latex'});
    this.isSuggestion = options?.isSuggestion ?? false;
    this.isError = false;
    this.verbatimLatex = value;
  }

  get computedStyle() {
    return {};
  }

  render(context) {
    // const result = new Box(this.value, {
    //   classes: this.isSuggestion ? 'ML__suggestion' : this.isError ? 'ML__error' : '',
    //   type: 'latex',
    //   maxFontSize: 1.0,
    // });
    // if (!result) return null;
    // if (this.caret) result.caret = this.caret;
    // return this.bind(context, result);
    return null;
  }
}

/**
 * A group that represents a raw LaTeX editing zone.
 * There is only one LatexGroupAtom at a time in an expression.
 */
export class LatexGroupAtom extends Atom {
  constructor(latex, context) {
    super('latexgroup', context, {mode: 'latex'});
    this.body = [...latex].map(x => new LatexAtom(x, context));

    this.skipBoundary = false;
  }

  render(context) {
    return null;
  }

  serialize(_options) {
    return this.body?.map(x => x.value).join('') ?? '';
  }
}
