import {useContext} from 'react';
import {TextAtom} from '../atoms/TextAtom';
import {MathfieldContext} from '../contexts/MathfieldContext';

export const Parser = () => {
  const {mathfieldValue} = useContext(MathfieldContext);

  const parse = () => {
    console.log(mathfieldValue);
    // return mathfieldValue;
    return [...mathfieldValue].map(el => <TextAtom token={el} />);
  };

  return parse();
};
