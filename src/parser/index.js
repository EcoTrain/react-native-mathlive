import {useContext} from 'react';
import {MathfieldContext} from '../contexts/MathfieldContext';
import {defaultGlobalContext} from '../core/context-utils';
import {parseLatex} from '../core/parser';

export const Parser = () => {
  const {mathfieldValue} = useContext(MathfieldContext);

  const parse = () => {
    const atoms = parseLatex(mathfieldValue, defaultGlobalContext(), {
      parseMode: 'math',
      mathstyle: 'displaystyle',
    });
    return atoms.map(x => x.render());
  };

  return parse();
};
