import {Atom} from '../core/atom';
import {defaultGlobalContext} from '../core/context-utils';
import {parseLatex} from '../core/parser';

export function latexToAsciiMath(latex, mode = 'math') {
  const context = defaultGlobalContext();
  const root = new Atom('root', context);
  root.body = parseLatex(latex, context, {parseMode: mode});
  return atomToAsciiMath(root);
}

const SPECIAL_IDENTIFIERS = {
  '\\ne': '≠',
  '\\neq': '≠',
  '-': '-',
  '\\alpha': 'alpha',
  '\\beta': 'beta',
  '\\gamma': 'gamma',
  '\\delta': 'delta',
  '\\epsilon': 'epsilon',
  '\\varepsilon': 'varepsilon',
  '\\zeta': 'zeta',
  '\\eta': 'eta',
  '\\theta': 'theta',
  '\\vartheta': 'vartheta',
  '\\iota': 'iota',
  '\\kappa': 'kappa',
  '\\lambda': 'lambda',
  '\\mu': 'mu',
  '\\nu': 'nu',
  '\\xi': 'xi',
  '\\pi': 'pi',
  '\\rho': 'rho',
  '\\sigma': 'sigma',
  '\\tau': 'tau',
  '\\upsilon': 'upsilon',
  '\\phi': 'phi',
  '\\varphi': 'varphi',
  '\\chi': 'chi',
  '\\psi': 'psi',
  '\\omega': 'omega',
  '\\Gamma': 'Gamma',
  '\\Delta': 'Delta',
  '\\Theta': 'Theta',
  '\\Lambda': 'Lambda',
  '\\Xi': 'Xi',
  '\\Pi': 'Pi',
  '\\Sigma': 'Sigma',
  '\\Phi': 'Phi',
  '\\Psi': 'Psi',
  '\\Omega': 'Omega',
  '\\exponentialE': 'e',
  '\\imaginaryI': 'i',
  '\\imaginaryJ': 'j',
  '\\!': ' ',
  '\\,': ' ',
  '\\:': ' ',
  '\\;': ' ',
  '\\enskip': ' ',
  '\\enspace': ' ',
  '\\qquad': ' ',
  '\\quad': ' ',
};

export function atomToAsciiMath(atom) {
  if (!atom) {
    return {
      asciiString: '',
      metaObject: {},
    };
  }
  if (Array.isArray(atom)) {
    if (atom.length === 0) {
      return {
        asciiString: '',
        metaObject: {},
      };
    }

    let result = '';
    let metaObject = {};

    if (atom[0].mode === 'latex') {
      for (const x of atom) {
        const asciiRes = atomToAsciiMath(x);
        result += asciiRes.asciiString;
        metaObject = Object.assign({}, metaObject, asciiRes.metaObject);
      }
    } else if (atom[0].mode === 'text') {
      // Text mode... put it in (ASCII) quotes
      let i = 0;
      result = '"';
      while (atom[i]?.mode === 'text') {
        if (atom[i].body) {
          const asciiRes = atomToAsciiMath(atom[i].body);
          result += asciiRes.asciiString;
          metaObject = Object.assign({}, metaObject, asciiRes.metaObject);
        } else {
          result += atom[i].value;
        }
        i++;
      }
      const asciiRes = atomToAsciiMath(atom.slice(i));
      result += asciiRes.asciiString;
      metaObject = Object.assign({}, metaObject, asciiRes.metaObject);
    } else if (atom[0].mode === 'math') {
      let i = 0;
      while (atom[i] && atom[i].mode === 'math') {
        const asciiRes = atomToAsciiMath(atom[i]);
        result += asciiRes.asciiString;
        metaObject = Object.assign({}, metaObject, asciiRes.metaObject);
        i++;
      }
      const asciiRes = atomToAsciiMath(atom.slice(i));
      result += asciiRes.asciiString;
      metaObject = Object.assign({}, metaObject, asciiRes.metaObject);
    } else {
      console.warn('toASCIIMath: Unexpected mode');
    }

    return {
      asciiString: result.trim(),
      metaObject,
    };
  }

  if (atom.mode === 'text') {
    return {
      asciiString: '"' + atom.value + '"', // Text -- add in (ASCII) quotes
      metaObject: {},
    };
  }

  let result = '';
  let metaObject = {};

  const {command} = atom;

  switch (atom.type) {
    case 'group':
    case 'root':
      if (SPECIAL_IDENTIFIERS[command]) {
        result = SPECIAL_IDENTIFIERS[command];
      } else {
        const asciiRes = atomToAsciiMath(atom.body);
        result += asciiRes.asciiString;
        metaObject = asciiRes.metaObject;
      }
      break;

    case 'phantom':
      const asciiRes = atomToAsciiMath(atom.body);
      result = asciiRes.asciiString;
      if (atom.metaObject) {
        metaObject = Object.assign({}, asciiRes.metaObject, atom.metaObject);
      }
      break;

    case 'genfrac':
      {
        const genfracAtom = atom;
        if (genfracAtom.leftDelim || genfracAtom.rightDelim) {
          result += genfracAtom.leftDelim === '.' || !genfracAtom.leftDelim ? '{:' : genfracAtom.leftDelim;
        }

        const above = atomToAsciiMath(genfracAtom.above);
        const below = atomToAsciiMath(genfracAtom.below);
        result += `(${above.asciiString})`;
        result += genfracAtom.hasBarLine ? '/' : ',';
        result += `(${below.asciiString})`;

        metaObject = Object.assign({}, above.metaObject, below.metaObject);

        if (genfracAtom.leftDelim || genfracAtom.rightDelim) {
          result += genfracAtom.rightDelim === '.' || !genfracAtom.rightDelim ? '{:' : genfracAtom.rightDelim;
        }
      }
      break;

    case 'sqrt':
      const body = atomToAsciiMath(atom.body);
      if (!atom.hasEmptyBranch('above')) {
        const above = atomToAsciiMath(atom.above);
        result += 'root(' + above.asciiString + ')(' + body.asciiString + ')';
        metaObject = Object.assign({}, above.metaObject, body.metaObject);
      } else {
        result += 'sqrt(' + body.asciiString + ')';
        metaObject = body.metaObject;
      }
      break;

    case 'latex':
      result = atom.value;
      break;
  }

  // Subscripts before superscripts (according to the ASCIIMath spec)
  if (!atom.hasEmptyBranch('subscript')) {
    result += '_';
    const asciiRes = atomToAsciiMath(atom.subscript);
    const arg = asciiRes.asciiString;
    result += arg.length > 1 ? '(' + arg + ')' : arg;
    metaObject = asciiRes.metaObject;
  }

  if (!atom.hasEmptyBranch('superscript')) {
    result += '^';
    const asciiRes = atomToAsciiMath(atom.superscript);
    const arg = asciiRes.asciiString;
    result += arg.length > 1 ? '(' + arg + ')' : arg;
    metaObject = asciiRes.metaObject;
  }

  return {
    asciiString: result,
    metaObject,
  };
}
