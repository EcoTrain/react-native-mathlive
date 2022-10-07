import {PhantomAtom} from '../../core-atoms/phantom';
import {defineFunction} from '../utils';

/**
 * Draw contents (second arg) with meta info in Atom class (first arg)
 */
defineFunction('smash', '[:object]{:auto}', {
  createAtom: (name, args, context) => {
    return new PhantomAtom(name, args[0], args[1], context, {});
  },
});

/**
 * The box created by \vphantom has the height and depth of its argument,
 * but its width is zero (so it doesn't contribute to any horizontal spacing issues).
 * In other words, \hphantom creates vertical space equal to that produced by its argument,
 * but doesn't create any horizontal space.
 */
defineFunction(['vphantom'], '{:auto*}', {
  createAtom: (name, args, context) => {
    return new PhantomAtom(name, args[0], args[1], context, {
      isInvisible: true,
      smashWidth: true,
    });
  },
});

/**
 * The box created by \hphantom has the width of its argument,
 * but its height and depth are zero (so it doesn't contribute to any vertical spacing issues).
 * In other words, \hphantom creates horizontal space equal to that produced by its argument,
 * but doesn't create any vertical space.
 */
defineFunction(['hphantom'], '{:auto*}', {
  createAtom: (name, args, context) => {
    return new PhantomAtom(name, args[0], args[1], context, {
      isInvisible: true,
      smashHeight: true,
      //   smashDepth: true,
    });
  },
});

/**
 * \phantom command draws space.
 * The box created by \phantom has width, height and depth equal to its argument.
 * In other words, \phantom creates horizontal and vertical space
 * equal to that of its argument, even though the argument isn't visible.
 */
defineFunction(['phantom'], '{:auto*}', {
  createAtom: (name, args, context) => {
    return new PhantomAtom(name, args[1], context, {
      isInvisible: true,
    });
  },
});
