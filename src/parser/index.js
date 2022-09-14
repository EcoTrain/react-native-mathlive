import {useContext} from 'react';
import {Atom} from '../atoms/Atom';
import {MathfieldContext} from '../contexts/MathfieldContext';
import {parseLatex} from './parser';

export const Parser = () => {
  const {mathfieldValue} = useContext(MathfieldContext);

  const parse = () => {
    // \frac{4+\placeholder{}}{16 + \sqrt{24 + \frac{3}{4}}} + 3
    console.log(mathfieldValue.startsWith('\\'));
    console.log(mathfieldValue.match(/^(sqrt)(.*)/));
    console.log(mathfieldValue.split(/{[\s,]}/));

    const atoms = parseLatex(mathfieldValue, {});
    console.log({atoms});

    // return [...mathfieldValue].map(el => <Atom token={el} type="frac" />);
    // return <Atom token={mathfieldValue} type="frac" />;
    return atoms[0].render();
  };

  return parse();
};
