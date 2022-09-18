import React, {createContext, useEffect, useState} from 'react';
import {defaultGlobalContext} from '../core/context-utils';
import {parseLatex} from '../core/parser';

const defaultValue = '\\frac{4+#?}{16 - 8} + #? + 3 + \\sqrt{24 + 333333333}';
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
    setSelectedAtom(atoms[atoms.length - 1]);
    console.log('MathfieldContext changeValue', {atoms});
  }, [mfValue]);

  const COMMANDS = {};
  COMMANDS.deleteBackward = () => {
    // TODO: change latex value on remove atom
    // TODO: add serialize to atoms
    console.log('COMMANDS deleteBackward');
    if (selectedAtom?.parent) {
      console.log('deleteBackward atom child', {selectedAtom, parent: selectedAtom.parent});
      const prevAtom = selectedAtom.leftSibling;
      selectedAtom.parent.removeChild(selectedAtom);
      setSelectedAtom(prevAtom);
    } else {
      console.log('deleteBackward atom root', {atoms: mfAtoms, selectedAtom, ind: mfAtoms.indexOf(selectedAtom)});
      const ind = mfAtoms.indexOf(selectedAtom);
      ind > -1 && mfAtoms.splice(ind, 1);
      setSelectedAtom(mfAtoms[ind > 0 ? ind - 1 : ind]);
    }
  };
  COMMANDS.addAtoms = ({options}) => {
    const _atoms = options.atoms || [];
    console.log('COMMANDS addAtoms', {atoms: mfAtoms, _atoms, selectedAtom});

    if (selectedAtom?.parent) {
      selectedAtom.parent.addChildrenAfter(_atoms, selectedAtom);
      if (selectedAtom.type == 'placeholder') {
        selectedAtom.parent.removeChild(selectedAtom);
      }
    } else {
      let ind = mfAtoms.indexOf(selectedAtom);
      if (selectedAtom.type == 'placeholder') {
        mfAtoms.splice(ind, 1);
        --ind;
      }
      mfAtoms.splice(ind + 1, 0, ..._atoms);
      console.log({mfAtoms, ind});
    }
    setSelectedAtom(_atoms[_atoms.length - 1]);
  };

  const defaultContextValues = {
    atoms: mfAtoms,
    selectedAtom,
    setSelectedAtom,
    mathfieldValue: mfValue,
    setMathfieldValue: value => {
      setMfValue(value);
      onChangeValue(value);
    },
    executeCommand: ({command, options}) => {
      console.log('executeCommand', command, COMMANDS);
      const _command = COMMANDS[command];
      if (_command) {
        _command({options});
      }
    },
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
