export const useDefinitions = () => {
  return {
    COMMANDS: useDefinitionsCommands(),
    // LATEX_COMMANDS: useDefinitionsLatex(),
  };
};

const useDefinitionsCommands = () => {
  const deleteBackward = ({mathfieldAtoms, setMathfieldAtoms}) => {
    let newMfAtoms = [...mathfieldAtoms];
    newMfAtoms.splice(-1);
    setMathfieldAtoms(newMfAtoms);
  };
  // const moveToPreviousChar = ({mathfieldAtoms, setMathfieldAtoms}) => {
  //   let newMfAtoms = [...mathfieldAtoms];
  //   newMfAtoms.splice(-1);
  //   setMathfieldAtoms(newMfAtoms);
  // };  const moveToNextChar = ({mathfieldAtoms, setMathfieldAtoms}) => {
  //   let newMfAtoms = [...mathfieldAtoms];
  //   newMfAtoms.splice(-1);
  //   setMathfieldAtoms(newMfAtoms);
  // };
  return {deleteBackward};
};

// const useDefinitionsLatex = () => {};
