import React, {createContext, useState} from 'react';

// const defaultValue = '\\frac{4+#?}{16 - 8} + 3 + \\sqrt{24 + 333333333}';
// const defaultValue = '\\frac{4+#?}{16 - 8} + 3 + \\sqrt{24 + \\frac{3}{#?} + 333333333}';
const defaultValue = '\\frac{4+#?}{16 - 8} + 3 + \\sqrt{24 + \\frac{\\frac{3}{#?}}{#?} + 333333333}';

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

  const defaultContextValues = {
    mathfieldValue: mfValue,
    setMathfieldValue: value => {
      // const placedValues = value.replaceAll('#0', '\\placeholder{}');
      setMfValue(value);
      onChangeValue(value);
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
