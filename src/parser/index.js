import {useContext} from 'react';
import {MathfieldContext} from '../contexts/MathfieldContext';
import {parseLatex} from '../core/parser';
import {defaultGlobalContext} from '../core/context-utils';

export const Parser = () => {
  const {mathfieldValue} = useContext(MathfieldContext);

  const parse = () => {
    // \frac{4+\placeholder{}}{16 + \sqrt{24 + \frac{3}{4}}} + 3

    const context = defaultGlobalContext();
    const atoms = parseLatex(mathfieldValue, context, {parseMode: 'math'});
    console.log({atoms});
    return atoms.map(x => x.render(context));
  };

  return parse();
};
