import {Atom, ToLatexOptions} from '../core/atom-class';
import {FontSize} from '../public/core';

import {GroupAtom} from '../core-atoms/group';
import {PhantomAtom} from '../core-atoms/phantom';
import {LineAtom} from '../core-atoms/line';
import {OverunderAtom} from '../core-atoms/overunder';
import {OverlapAtom} from '../core-atoms/overlap';
import {GenfracAtom} from '../core-atoms/genfrac';
import type {MathstyleName} from '../core/mathstyle';
import type {BoxType} from '../core/box';
import type {GlobalContext, PrivateStyle} from '../core/context';

import {Argument, defineFunction} from './definitions-utils';

defineFunction('ensuremath', '{:math}', {
  createAtom: (_name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new GroupAtom(args[0] as Atom[], context, {
      mode: 'math',
      latexOpen: '\\ensuremath{',
      latexClose: '}',
      style,
      // mathstyleName: 'textstyle',
    }),
});

// The `\displaystyle` and `\textstyle` commands do not change the current size
// but they do change how some of the layout is done.
// `\scriptstyle` reduces the size by one on the FontSizeScale, and
// `\scriptscriptstyle` reduces it by two.
defineFunction(['displaystyle', 'textstyle', 'scriptstyle', 'scriptscriptstyle'], '{:rest}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new GroupAtom(args[0] as Atom[], context, {
      latexOpen: `{${name} `,
      latexClose: '}',
      style,
      mathstyleName: name.slice(1) as MathstyleName,
    }),
});

defineFunction('text', '{:text}', {
  ifMode: 'math',
  applyMode: 'text',
});

class UnicodeAtom extends Atom {
  codepoint: number;
  constructor(arg: string, style: PrivateStyle, context: GlobalContext) {
    let codepoint = Number.parseInt(arg);
    if (!Number.isFinite(codepoint)) codepoint = 0x2753; // BLACK QUESTION MARK
    super('mord', context, {
      value: String.fromCodePoint(codepoint),
      style,
    });
    this.codepoint = codepoint;
  }

  serialize(_options: ToLatexOptions): string {
    return '\\unicode"' + ('000000' + this.codepoint.toString(16)).toUpperCase().slice(-6);
  }
}

defineFunction('unicode', '{charcode:number}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new UnicodeAtom(args[0] as string, style, context),
});

// An overline
defineFunction('overline', '{:auto}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new LineAtom(name, args[0] as Atom[], context, {
      position: 'overline',
      style,
    }),
});

defineFunction('underline', '{:auto}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new LineAtom(name, args[0] as Atom[], context, {
      position: 'underline',
      style,
    }),
});

export function binRelType(atoms: Atom[]): BoxType {
  if (atoms.length === 1) {
    const atom = atoms[0];
    if (atom!.type === 'mbin') return 'mbin';
    if (atom!.type === 'mrel') return 'mrel';
  }
  return 'mord';
}

defineFunction('overset', '{above:auto}{base:auto}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new OverunderAtom(name, context, {
      above: args[0] as Atom[],
      body: args[1] as Atom[],
      skipBoundary: false,
      style,
      boxType: binRelType(args[1] as Atom[]),
      serialize: (atom: OverunderAtom, options: ToLatexOptions) =>
        `${atom.command}{${atom.aboveToLatex(options)}}` + `{${atom.bodyToLatex(options)}}`,
    }),
});

defineFunction('underset', '{below:auto}{base:auto}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new OverunderAtom(name, context, {
      below: args[0] as Atom[],
      body: args[1] as Atom[],
      skipBoundary: false,
      style,
      boxType: binRelType(args[1] as Atom[]),
      serialize: (atom: OverunderAtom, options: ToLatexOptions) =>
        `${name}{${atom.belowToLatex(options)}}` + `{${atom.bodyToLatex(options)}}`,
    }),
});

defineFunction('overunderset', '{above:auto}{below:auto}{base:auto}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new OverunderAtom(name, context, {
      above: args[0] as Atom[],
      below: args[1] as Atom[],
      body: args[2] as Atom[],
      skipBoundary: false,
      style,
      boxType: binRelType(args[2] as Atom[]),
      serialize: (atom: OverunderAtom, options: ToLatexOptions) =>
        `${atom.command}{${atom.aboveToLatex(options)}}` + `{${atom.bodyToLatex(options)}}`,
    }),
});

// `\stackrel` and `\stackbin` stack an item and provide an explicit
// atom type of the result. They are considered obsolete commands.
// `\underset` and `\overset` are recommended instead, which automatically
// calculate the resulting type.
defineFunction(['stackrel', 'stackbin'], '[below:auto]{above:auto}{base:auto}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new OverunderAtom(name, context, {
      body: args[2] as Atom[],
      above: args[1] as Atom[],
      below: args[0] as Atom[],
      skipBoundary: false,
      style,
      boxType: name === '\\stackrel' ? 'mrel' : 'mbin',
      serialize: (atom: OverunderAtom, options: ToLatexOptions) =>
        `${atom.command}{${atom.aboveToLatex(options)}}` + `{${atom.bodyToLatex(options)}}`,
    }),
});

defineFunction(['overwithdelims', 'atopwithdelims'], '{numer:auto}{denom:auto}{left-delim:delim}{right-delim:delim}', {
  infix: true,
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new GenfracAtom(name, args[0] as Atom[], args[1] as Atom[], context, {
      leftDelim: args[2] as string,
      rightDelim: args[3] as string,
      hasBarLine: false,
      style,
      serialize: (atom: GenfracAtom, options: ToLatexOptions) =>
        `${atom.aboveToLatex(options)} ${atom.command}${atom.leftDelim}${atom.rightDelim}${atom.belowToLatex(options)}`,
    }),
});

defineFunction('smash', '[:string]{:auto}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom => {
    if (!args[0]) {
      return new PhantomAtom(name, args[1] as Atom[], context, {
        smashHeight: true,
        smashDepth: true,
        style,
      });
    }

    return new PhantomAtom(name, args[1] as Atom[], context, {
      smashHeight: (args[0] as string).includes('t'),
      smashDepth: (args[0] as string).includes('b'),
      style,
    });
  },
});

defineFunction(['vphantom'], '{:auto*}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new PhantomAtom(name, args[1] as Atom[], context, {
      isInvisible: true,
      smashWidth: true,
      style,
    }),
});

defineFunction(['hphantom'], '{:auto*}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new PhantomAtom(name, args[1] as Atom[], context, {
      isInvisible: true,
      smashHeight: true,
      smashDepth: true,
      style,
    }),
});

defineFunction(['phantom'], '{:auto*}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new PhantomAtom(name, args[1] as Atom[], context, {
      isInvisible: true,
      style,
    }),
});

defineFunction('not', '{:math}', {
  createAtom: (name: string, args: Argument[], style: PrivateStyle, context: GlobalContext): Atom => {
    if (args.length < 1 || args[0] === null) {
      return new Atom('mrel', context, {
        command: name,
        style,
        value: '\ue020',
      });
    }
    const arg = args[0] as Atom[];
    return new GroupAtom(
      [
        new OverlapAtom(name, '\ue020', context, {
          align: 'right',
          style,
          boxType: 'mrel',
        }),
        ...arg,
      ],
      context,
      {
        boxType: 'mrel',
        captureSelection: true,
        command: '\\not',
        serialize: (_atom: GroupAtom, options) => {
          const argLatex = Atom.serialize(arg, options);
          if (argLatex.length === 1 && !/[a-zA-Z]/.test(argLatex)) return '\\not' + argLatex;

          return `\\not{${argLatex}}`;
        },
      }
    );
  },
});

defineFunction(['ne', 'neq'], '', {
  createAtom: (name: string, _args: Argument[], style: PrivateStyle, context: GlobalContext): Atom =>
    new GroupAtom(
      [
        new OverlapAtom(name, '\ue020', context, {
          align: 'right',
          style,
          boxType: 'mrel',
        }),
        new Atom('mrel', context, {style, value: '='}),
      ],
      context,
      {
        boxType: 'mrel',
        captureSelection: true,
        serialize: () => name,
        command: name,
      }
    ),
});
