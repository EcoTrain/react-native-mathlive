import React, {createContext, useEffect, useState} from 'react';
import {defaultGlobalContext} from '../core/context-utils';
import {parseLatex} from '../core/parser';

const defaultValue = '\\frac{4+#?}{16 - 8} + 3 + \\sqrt{24 + 333333333}';
// const defaultValue = '\\frac{4+#?}{16 - 8} + 3 + \\sqrt{24 + \\frac{3}{#?} + 333333333}';
// const defaultValue = '\\frac{4+#?}{16 - 8} + 3 + \\sqrt{24 + \\frac{\\frac{3}{#?}}{#?} + 333333333}';
// const defaultValue =
//   '\\frac{4+#?}{16 - 8} + 3 + \\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?} + 333333333}';

export const MathfieldContext = createContext({
  atoms: [],
  setAtoms: () => {},
  selectedAtom: null,
  mathfieldValue: defaultValue,
  setMathfieldValue: () => {},
  executeCommand: () => {},
});

export const MathfieldContextProvider = ({children, onChangeValue}) => {
  const [mfValue, setMfValue] = useState(defaultValue);
  const [mfAtoms, setMfAtoms] = useState([]);
  const [selectedAtom, setSelectedAtom] = useState();

  useEffect(() => {
    const atoms = parseLatex(
      mfValue,
      {...defaultGlobalContext()},
      {
        parseMode: 'math',
        mathstyle: 'displaystyle',
        args: () => '\\placeholder{}',
      }
    );
    setMfAtoms(atoms);
    console.log('MathfieldContext', {atoms});
  }, [mfValue]);

  const COMMANDS = {};
  COMMANDS.deleteBackward = () => {
    console.log('deleteBackward');
    setMfAtoms(mfAtoms.slice(0, -1));
  };

  const defaultContextValues = {
    atoms: mfAtoms,
    setAtoms: setMfAtoms,
    selectedAtom,
    setSelectedAtom,
    mathfieldValue: mfValue,
    setMathfieldValue: value => {
      setMfValue(value);
      onChangeValue(value);
    },
    executeCommand: command => {
      console.log('executeCommand', command, COMMANDS);
      const _command = COMMANDS[command];
      if (_command) _command();
    },
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
