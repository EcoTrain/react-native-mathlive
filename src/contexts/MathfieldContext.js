import React, {createContext, useState} from 'react';
import {useDefinitions} from '../definitions/commands';

export const MathfieldContext = createContext({
  mathfieldValue: '',
  setMathfieldValue: () => {},
  focused: false,
});

export const MathfieldContextProvider = ({children}) => {
  const [mfValue, setMfValue] = useState('');
  const {COMMANDS} = useDefinitions();

  const defaultContextValues = {
    mathfieldValue: mfValue,
    setMathfieldValue: value => {
      setMfValue(value);
    },
    executeCommand: command => {
      console.log('executeCommand', command, COMMANDS);
      const _command = COMMANDS[command];

      const commandOptions = {mathfieldAtoms: mfAtoms, setMathfieldAtoms: setMfAtoms};
      if (_command) _command(commandOptions);
    },
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
