import {joinLatex} from '../core/tokenizer';

import type {Atom} from '../core/atom-class';
import type {GlobalContext} from '../core/context';
import {SurdAtom} from '../core-atoms/surd';
import {GenfracAtom, GenfracOptions} from '../core-atoms/genfrac';

import {Argument, defineFunction} from './definitions-utils';

// Root
defineFunction('sqrt', '[index:auto]{radicand:auto}', {
  createAtom: (command: string, args: Argument[], style: any, context: GlobalContext): Atom =>
    new SurdAtom(command, context, {
      body: args[1] as Atom[],
      index: args[0] as Atom[],
      style,
    }),
});

// Fractions
defineFunction(['frac', 'dfrac', 'tfrac', 'cfrac', 'binom', 'dbinom', 'tbinom'], '{numerator}{denominator}', {
  createAtom: (command: string, args: Argument[], style: any, context: GlobalContext): Atom => {
    const options: GenfracOptions = {style};
    switch (command) {
      case '\\dfrac':
      case '\\frac':
      case '\\tfrac':
        options.hasBarLine = true;
        break;
      case '\\atopfrac':
        options.hasBarLine = false;
        break;
      case '\\dbinom':
      case '\\binom':
      case '\\tbinom':
        options.hasBarLine = false;
        options.leftDelim = '(';
        options.rightDelim = ')';
        break;
      default:
    }

    switch (command) {
      case '\\dfrac':
      case '\\dbinom':
        options.mathstyleName = 'displaystyle';
        break;
      case '\\tfrac':
      case '\\tbinom':
        options.mathstyleName = 'textstyle';
        break;
      case '\\cfrac':
        options.hasBarLine = true;
        options.continuousFraction = true;
        break;
      default:
    }

    return new GenfracAtom(command, args[0] as Atom[], args[1] as Atom[], context, options);
  },
});

defineFunction(['brace', 'brack'], '', {
  infix: true,
  createAtom: (command: string, args: Argument[], style: any, context: GlobalContext): Atom =>
    new GenfracAtom(command, args[0] as Atom[], args[1] as Atom[], context, {
      hasBarLine: false,
      leftDelim: command === '\\brace' ? '\\lbrace' : '\\lbrack',
      rightDelim: command === '\\brace' ? '\\rbrace' : '\\rbrack',
      style,
      serialize: (atom, options) => joinLatex([atom.aboveToLatex(options), atom.command, atom.belowToLatex(options)]),
    }),
});

defineFunction(['over', 'atop', 'choose'], '', {
  infix: true,
  createAtom: (command: string, args: Argument[], style: any, context: GlobalContext): Atom => {
    let leftDelim: string | undefined = undefined;
    let rightDelim: string | undefined = undefined;

    if (command === '\\choose') {
      leftDelim = '(';
      rightDelim = ')';
    }

    return new GenfracAtom(command, args[0] as Atom[], args[1] as Atom[], context, {
      hasBarLine: command === '\\over',
      leftDelim,
      rightDelim,
      style,
      serialize: (atom, options) => joinLatex([atom.aboveToLatex(options), atom.command, atom.belowToLatex(options)]),
    });
  },
});

// Slashed package
/*
defineFunction('\\slashed'
*/

defineFunction('pdiff', '{numerator}{denominator}', {
  createAtom: (command: string, args: Argument[], style: any, context: GlobalContext): Atom =>
    new GenfracAtom(command, args[0] as Atom[], args[1] as Atom[], context, {
      hasBarLine: true,
      numerPrefix: '\u2202',
      denomPrefix: '\u2202',
      style,
    }),
});
