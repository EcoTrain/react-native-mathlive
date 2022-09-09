import React, {createContext, useState} from 'react';

export const MathfieldContext = createContext({
  mathfieldValue: '',
  setMathfieldValue: value => {},
  focused: false,
});

export const MathfieldContextProvider = ({children}) => {
  const [mfValue, setMfValue] = useState('');

  const defaultContextValues = {
    mathfieldValue: mfValue,
    setMathfieldValue: value => {
      setMfValue(value);
    },
    executeCommand: command => {
      console.log('executeCommand', command);
    },
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
