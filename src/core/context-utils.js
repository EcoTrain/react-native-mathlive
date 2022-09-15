import {LATEX_COMMANDS, MATH_SYMBOLS, TEXT_SYMBOLS} from '../core-definitions/definitions';

/** @internal */
export function defaultGlobalContext() {
  const result = {
    placeholderSymbol: '▢',
    getDefinition: defaultGetDefinition,
  };

  return {...result};
}

export function defaultGetDefinition(token, parseMode = 'math') {
  if (!token || token.length === 0) return null;

  console.log({MATH_SYMBOLS, TEXT_SYMBOLS, LATEX_COMMANDS});
  let info = null;

  if (token.startsWith('\\')) {
    // This could be a function or a token
    info = LATEX_COMMANDS[token];
    if (info) return info;

    // It wasn't a function, maybe it's a token?
    if (parseMode === 'math') info = MATH_SYMBOLS[token];
    else if (TEXT_SYMBOLS[token]) {
      info = {
        definitionType: 'symbol',
        type: 'mord',
        codepoint: TEXT_SYMBOLS[token],
      };
    }
  } else if (TEXT_SYMBOLS[token]) {
    info = {
      definitionType: 'symbol',
      type: 'mord',
      codepoint: TEXT_SYMBOLS[token],
    };
  } else if (parseMode === 'text') {
    info = {
      definitionType: 'symbol',
      type: 'mord',
      codepoint: token.codePointAt(0),
    };
  }

  // Special case `f`, `g` and `h` are recognized as functions.
  if (
    info &&
    info.definitionType === 'symbol' &&
    info.type === 'mord' &&
    (info.codepoint === 0x66 || info.codepoint === 0x67 || info.codepoint === 0x68)
  )
    info.isFunction = true;

  return info ?? null;
}
