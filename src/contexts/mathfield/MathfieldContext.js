import React, {createContext, useEffect, useState} from 'react';

export const MathfieldContext = createContext({
  atoms: [],
  setAtoms: () => {},
  selectedAtom: null,
  setSelectedAtom: () => {},
});

export const MathfieldContextProvider = ({children}) => {
  const [mfAtoms, setMfAtoms] = useState([]);
  const [selectedAtom, setSelectedAtom] = useState();
  const [focused, setFocus] = useState(false);

  // useEffect(() => {
  //   console.log('selectedAtom', selectedAtom);
  // }, [selectedAtom]);

  // useEffect(() => {
  //   console.log('mfAtoms', mfAtoms);
  // }, [mfAtoms]);

  const defaultContextValues = {
    atoms: mfAtoms,
    setAtoms: setMfAtoms,
    selectedAtom,
    setSelectedAtom,
    focused,
    setFocus,
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
