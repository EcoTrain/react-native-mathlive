import React, {createContext, useState} from 'react';
import {useDefinitions} from '../definitions/commands';

// const defaultValue = '\\frac{4+#0}{16 + \\sqrt{24 + \\frac{3}{4}}} + 3';
const defaultValue = '\\frac{4+\\placeholder{}}{16 + \\sqrt{24 + \\frac{3}{4}} + 3';

export const MathfieldContext = createContext({
  mathfieldValue: defaultValue,
  setMathfieldValue: () => {},
  caretPositions: 0,
  setCaretPosition: () => {},
  executeCommand: () => {},
});

export const MathfieldContextProvider = ({children, onChangeValue}) => {
  const [mfValue, setMfValue] = useState(defaultValue);
  const [caretPos, setCaretPos] = useState(0);
  const {COMMANDS} = useDefinitions();

  const defaultContextValues = {
    mathfieldValue: mfValue,
    setMathfieldValue: value => {
      const placedValues = value.replaceAll('#0', '\\placeholder{}');
      setMfValue(placedValues);
      onChangeValue(placedValues);
    },
    caretPositions: caretPos,
    setCaretPosition: pos => {
      setCaretPos(pos);
    },
    executeCommand: command => {
      console.log('executeCommand', command, COMMANDS);
      // const _command = COMMANDS[command];
      // const commandOptions = this;
      // if (_command) _command(commandOptions);
    },
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
