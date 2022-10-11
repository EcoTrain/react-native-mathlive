import {useContext, useEffect} from 'react';
import {MathfieldContext} from '../../contexts/mathfield/MathfieldContext';
import {defaultGlobalContext} from '../../core/context-utils';
import {parseLatex} from '../../core/parser';

const defaultValue = [
  '3',
  '+ {98 - \\sqrt{6}}',
  '+ \\frac{4+#?}{16 - 8}',
  '+ #?',
  '+ \\smash[{"textVar2":"metaVar2"}]{textVar2}',
  // '+ \\smash[{"id":"metaVar2"}]{\\sqrt{24 + \\frac{\\sqrt{#?}}{#?}}',
  // '+ \\hphantom{\\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?}}}',
  // '+ \\vphantom{\\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?}}}',
  '+ \\sqrt{24}',
  // '+ \\sqrt{24 + \\frac{\\sqrt{#?}}{#?}}',
  // '+ \\sqrt{24 + \\frac{\\frac{\\frac{\\frac{3}{#?}}{#?}}{#?}}{#?}}',
].join(' ');

export const testDefaultMfValue = () => {
  const {setAtoms, setSelectedAtom} = useContext(MathfieldContext);

  useEffect(() => {
    const atoms = parseLatex(
      defaultValue,
      {...defaultGlobalContext()},
      {
        parseMode: 'math',
        mathstyle: 'displaystyle',
        args: () => '\\placeholder{}',
      }
    );
    setAtoms(atoms);
    setSelectedAtom(atoms[atoms.length - 1]);
  }, [setAtoms, setSelectedAtom]);
};
