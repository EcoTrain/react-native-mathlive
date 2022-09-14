import {TextAtom} from '../core-atoms/TextAtom';
import {Token, tokenize, tokensToString} from './tokenizer';

/**
 * Given a string of LaTeX, return a corresponding array of atoms.
 * @param args - If there are any placeholder tokens, e.g.
 * `#0`, `#1`, etc... they will be replaced by the value provided by `args`.
 * @param smartFence - If true, promote plain fences, e.g. `(`,
 * as `\left...\right` or `\mleft...\mright`
 */
export function parseLatex(s, options) {
  const args = options?.args ?? null;
  console.log('parseLatex', {s, options, tokens: tokenize(s, args)});

  const textAtom = new TextAtom('', s);
  return [textAtom];
  // const parser = new Parser(tokenize(s, args), context, {
  //   args,
  //   mathstyle: options?.mathstyle ?? 'displaystyle',
  //   parseMode: options?.parseMode ?? 'math',
  // });

  // const atoms = [];
  // while (!parser.end()) atoms.push(...parser.parse());
  // return atoms;
}

export function validateLatex(s, options) {
  console.log('validateLatex', {s, options});
  // const parser = new Parser(tokenize(s, null), {
  //   args: null,
  //   mathstyle: 'displaystyle',
  //   parseMode: options?.parseMode ?? 'math',
  // });

  // while (!parser.end()) parser.parse();
  // return parser.errors;
  return [];
}
