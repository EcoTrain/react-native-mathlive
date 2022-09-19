import React, {createContext, useEffect, useState} from 'react';
import {defaultGlobalContext} from '../core/context-utils';
import {parseLatex} from '../core/parser';

const defaultValue = [
  '3 + \\frac{4+#?}{16 - 8}',
  '+ #? + 3',
  '+ \\smash[testMeta]{testSmash}',
  '+ \\smash{testSmash2}',
  // '+ \\smash[testMeta]{\\sqrt{24 + \\frac{\\sqrt{#?}}{#?}}',
  // '+ \\hphantom{\\sqrt{24 + \\frac{\\sqrt{#?}}{#?}}}',
  '+ \\sqrt{24}',
  // '+ \\sqrt{24 + \\frac{\\sqrt{#?}}{#?}}',
  // '+ \\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?}',
].join(' ');

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

  useEffect(() => {
    console.log('selectedAtom', selectedAtom);
  }, [selectedAtom]);

  const getPreviousAtom = () => {
    let prevAtom;
    if (selectedAtom?.parent) {
      const leftSibling = selectedAtom.leftSibling;
      if (leftSibling) {
        prevAtom = leftSibling;
      } else {
        const ind = mfAtoms.indexOf(selectedAtom.parent);
        if (ind > -1) {
          prevAtom = mfAtoms[ind - 1];
        }
      }
    } else {
      const ind = mfAtoms.indexOf(selectedAtom);
      if (ind > -1) {
        prevAtom = mfAtoms[ind - 1];
      }
    }
    return prevAtom;
  };
  const getNextAtom = () => {
    let nextAtom;
    if (selectedAtom?.parent) {
      const rightSibling = selectedAtom.rightSibling;
      if (rightSibling) {
        nextAtom = rightSibling;
      } else {
        const ind = mfAtoms.indexOf(selectedAtom.parent);
        if (ind < mfAtoms.length - 1) {
          nextAtom = mfAtoms[ind - 1];
        }
      }
    } else {
      const ind = mfAtoms.indexOf(selectedAtom);
      if (ind < mfAtoms.length - 1) {
        nextAtom = mfAtoms[ind + 1];
      }
    }
    return nextAtom;
  };

  const COMMANDS = {};
  COMMANDS.deleteBackward = () => {
    // TODO: change latex value on remove atom
    // TODO: add serialize to atoms
    if (selectedAtom?.parent) {
      console.log('deleteBackward atom child', {selectedAtom, parent: selectedAtom.parent});
      const leftSibling = selectedAtom.leftSibling;

      // Set previous atom as selected
      if (leftSibling) setSelectedAtom(leftSibling);
      else setSelectedAtom(selectedAtom.parent);

      // Remove selected atom
      selectedAtom.parent.removeChild(selectedAtom);
    } else {
      const ind = mfAtoms.indexOf(selectedAtom);
      console.log('deleteBackward atom root', {mfAtoms, selectedAtom, ind});
      if (ind > -1) {
        mfAtoms.splice(ind, 1);
        // Set prev atom: Undefined if rm first
        setSelectedAtom(mfAtoms[ind - 1]);
      }
    }
  };
  COMMANDS.addAtoms = ({options}) => {
    const _atoms = options.atoms || [];
    console.log('COMMANDS addAtoms', {mfAtoms, _atoms, selectedAtom});

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
    }
    setSelectedAtom(_atoms[_atoms.length - 1]);
  };
  COMMANDS.moveToPreviousChar = () => {
    const prevAtom = getPreviousAtom();
    prevAtom && setSelectedAtom(prevAtom);
  };
  COMMANDS.moveToNextChar = () => {
    const nextAtom = getNextAtom();
    nextAtom && setSelectedAtom(nextAtom);
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
      const _command = COMMANDS[command];
      if (_command) {
        _command({options});
      }
    },
  };

  return <MathfieldContext.Provider value={defaultContextValues}>{children}</MathfieldContext.Provider>;
};
