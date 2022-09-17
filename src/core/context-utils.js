import {LATEX_COMMANDS, MATH_SYMBOLS} from '../core-definitions';

/** @internal */
export function defaultGlobalContext() {
  const result = {
    placeholderSymbol: '▢',
    placeOnKeyboard: false,
    getDefinition: defaultGetDefinition,
  };

  return {...result};
}

export function defaultGetDefinition(token) {
  if (!token || token.length === 0) return null;

  // console.log({MATH_SYMBOLS, LATEX_COMMANDS});
  let info = null;

  if (token.startsWith('\\')) {
    // This could be a function or a token
    info = LATEX_COMMANDS[token];
    if (info) return info;

    info = MATH_SYMBOLS[token];
  } else {
    info = {
      definitionType: 'symbol',
      type: 'mord',
      symbol: token,
    };
  }

  return info ?? null;
}
