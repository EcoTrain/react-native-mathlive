import React, {createContext, useEffect, useState} from 'react';

export const MathfieldContext = createContext({
  atoms: [],
  setAtoms: () => {},
  selectedAtom: null,
  setSelectedAtom: () => {},
});

export const MathfieldContextProvider = ({children, onChangeValue}) => {
  const [mfAtoms, setMfAtoms] = useState([]);
  const [selectedAtom, setSelectedAtom] = useState();

  // useEffect(() => {
  //   console.log('selectedAtom', selectedAtom);
  // }, [selectedAtom]);

  const defaultContextValues = {
    atoms: mfAtoms,
    setAtoms: setMfAtoms,
    selectedAtom,
    setSelectedAtom,
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
