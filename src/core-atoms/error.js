import {Atom} from '../core/atom';

/*
 * An atom representing a syntactic error, such as an unknown command
 */
export class ErrorAtom extends Atom {
  constructor(value, context) {
    super('error', context, {value, command: value, mode: 'math'});
    this.verbatimLatex = value;
  }

  render(context) {
    return 'error';
  }
}
