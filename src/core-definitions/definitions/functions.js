import {GenfracAtom} from '../../core-atoms/genfrac';
import {SqrtAtom} from '../../core-atoms/sqrt';
import {defineFunction} from '../utils';

// Root
defineFunction('sqrt', '{radicand:auto}', {
  createAtom: (command, args, context) =>
    new SqrtAtom(command, context, {
      body: args[0],
    }),
});

// Fractions
defineFunction(['frac', 'dfrac', 'tfrac', 'binom', 'dbinom', 'tbinom'], '{numerator}{denominator}', {
  createAtom: (command, args, context) => {
    const options = {};
    switch (command) {
      case '\\dfrac':
      case '\\frac':
      case '\\tfrac':
        options.hasBarLine = true;
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

    return new GenfracAtom(command, args[0], args[1], context, options);
  },
});
