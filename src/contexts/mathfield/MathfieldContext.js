import React, {createContext, useEffect, useState} from 'react';
import {defaultGlobalContext} from '../../core/context-utils';
import {parseLatex} from '../../core/parser';

const defaultValue = [
  '3',
  // '+ (98-\\sqrt{6})',
  '+ \\frac{4+#?}{16 - 8}',
  '+ #?',
  '+ \\smash[testMeta]{testSmash}',
  // '+ \\smash{testSmash2}',
  // '+ \\smash[testMeta]{\\sqrt{24 + \\frac{\\sqrt{#?}}{#?}}',
  // '+ \\hphantom{\\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?}}}',
  // '+ \\vphantom{\\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?}}}',
  // '+ \\sqrt{24}',
  // '+ \\sqrt{24 + \\frac{\\sqrt{#?}}{#?}}',
  // '+ \\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?}}',
].join(' ');

export const MathfieldContext = createContext({
  atoms: [],
  setAtoms: () => {},
  selectedAtom: null,
});

export const MathfieldContextProvider = ({children, onChangeValue}) => {
  const [mfAtoms, setMfAtoms] = useState([]);
  const [selectedAtom, setSelectedAtom] = useState();

  useEffect(() => {
    const atoms = parseLatex(
      defaultValue,
      {...defaultGlobalContext()},
      {
        parseMode: 'math',
        mathstyle: 'displaystyle',
        args: () => '\\placeholder{}',
      }
    );
    setMfAtoms(atoms);
    setSelectedAtom(atoms[atoms.length - 1]);
    console.log('MathfieldContext defaultValue', {atoms});
  }, []);

  useEffect(() => {
    console.log('selectedAtom', selectedAtom);
  }, [selectedAtom]);

  const defaultContextValues = {
    atoms: mfAtoms,
    selectedAtom,
    setSelectedAtom,
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
