import type {Style, ParseMode} from '../public/core';
import type {GroupAtom} from '../core-atoms/group';
import type {Atom, ToLatexOptions} from './atom';
import type {Box} from './box';
import type {GlobalContext} from './context';
import type {ArgumentType} from './parser';
import type {Token} from './tokenizer';

export interface ParseTokensOptions {
  smartFence: boolean;
  style: any;
  args: (arg: string) => string;
  parse: (mode: ArgumentType, tokens: Token[], options: ParseTokensOptions) => [Atom[], Token[]];
}

export abstract class Mode {
  static _registry: Record<string, Mode> = {};
  constructor(name: string) {
    Mode._registry[name] = this;
  }

  static createAtom(mode: ParseMode, command: string, context: GlobalContext, style?: any): Atom | null {
    return Mode._registry[mode]!.createAtom(command, context, style);
  }

  // `run` should be a run (sequence) of atoms all with the same
  // mode
  static serialize(run: Atom[], options: ToLatexOptions): string {
    console.assert(run.length > 0);
    const mode = Mode._registry[run[0]!.mode];
    return mode!.serialize(run, options);
  }

  abstract createAtom(command: string, context: GlobalContext, style?: any): Atom | null;

  abstract serialize(_run: Atom[], _options: ToLatexOptions): string;
}

/*
 * Return an array of runs with the same mode
 */
export function getModeRuns(atoms: Atom[]): Atom[][] {
  const result: Atom[][] = [];
  let run: Atom[] = [];
  let currentMode = 'NONE';
  for (const atom of atoms) {
    if (atom.type !== 'first') {
      if (atom.mode !== currentMode) {
        if (run.length > 0) result.push(run);
        run = [atom];
        currentMode = atom.mode;
      } else run.push(atom);
    }
  }
  // Push whatever is left
  if (run.length > 0) result.push(run);
  return result;
}
