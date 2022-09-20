import {useContext} from 'react';
import {MathfieldContext} from '../mathfield/MathfieldContext';

const COMMANDS = {};

/**
 * Execute command on key press
 */
export const executeCommand = ({command, options}) => {
  const _command = COMMANDS[command];
  if (_command) {
    _command({options});
  }
};

/**
 * Define commands for executeCommand on key press
 */
export const defineCommands = () => {
  const mfc = useContext(MathfieldContext);

  const getPreviousAtom = () => {
    let prevAtom;
    if (mfc.selectedAtom?.parent) {
      const leftSibling = mfc.selectedAtom.leftSibling;
      if (leftSibling) {
        prevAtom = leftSibling;
      } else {
        prevAtom = mfc.selectedAtom.parent;
      }
    } else {
      const ind = mfc.atoms.indexOf(mfc.selectedAtom);
      if (ind > 0) {
        prevAtom = mfc.atoms[ind - 1];
      }
    }
    return prevAtom;
  };
  const getNextAtom = () => {
    let nextAtom;
    if (mfc.selectedAtom?.parent) {
      const rightSibling = mfc.selectedAtom.rightSibling;
      if (rightSibling) {
        nextAtom = rightSibling;
      } else {
        nextAtom = mfc.selectedAtom.parent;
      }
    } else {
      const ind = mfc.atoms.indexOf(mfc.selectedAtom);
      if (ind > -1 && ind < mfc.atoms.length - 1) {
        nextAtom = mfc.atoms[ind + 1];
      }
    }
    return nextAtom;
  };

  COMMANDS.deleteBackward = () => {
    // TODO: change latex value on remove atom
    // TODO: add serialize to atoms
    if (mfc.selectedAtom?.parent) {
      console.log('deleteBackward atom child', {selectedAtom: mfc.selectedAtom, parent: mfc.selectedAtom.parent});
      const leftSibling = mfc.selectedAtom.leftSibling;

      // Set previous atom as selected
      if (leftSibling) {
        mfc.setSelectedAtom(leftSibling);
      } else {
        mfc.setSelectedAtom(mfc.selectedAtom.parent);
      }

      // Remove selected atom
      mfc.selectedAtom.parent.removeChild(mfc.selectedAtom);
    } else {
      const ind = mfc.atoms.indexOf(mfc.selectedAtom);
      console.log('deleteBackward atom root', {atoms: mfc.atoms, selectedAtom: mfc.selectedAtom, ind});
      if (ind > -1) {
        mfc.atoms.splice(ind, 1);
        // Set prev atom: Undefined if rm first
        mfc.setSelectedAtom(mfc.atoms[ind - 1]);
      }
    }
  };
  COMMANDS.addAtoms = ({options}) => {
    const _atoms = options.atoms || [];
    console.log('COMMANDS addAtoms', {atoms: mfc.atoms, _atoms, selectedAtom: mfc.selectedAtom});

    if (mfc.selectedAtom?.parent) {
      mfc.selectedAtom.parent.addChildrenAfter(_atoms, mfc.selectedAtom);
      if (mfc.selectedAtom.type == 'placeholder') {
        mfc.selectedAtom.parent.removeChild(mfc.selectedAtom);
      }
    } else {
      let ind = mfc.atoms.indexOf(mfc.selectedAtom);
      if (mfc.selectedAtom?.type == 'placeholder') {
        mfc.atoms.splice(ind, 1);
        --ind;
      }
      mfc.atoms.splice(ind + 1, 0, ..._atoms);
    }
    mfc.setSelectedAtom(_atoms[_atoms.length - 1]);
  };
  COMMANDS.moveToPreviousChar = () => {
    const prevAtom = getPreviousAtom();
    prevAtom && mfc.setSelectedAtom(prevAtom);
  };
  COMMANDS.moveToNextChar = () => {
    const nextAtom = getNextAtom();
    nextAtom && mfc.setSelectedAtom(nextAtom);
  };
};
