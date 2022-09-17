import {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../components/styled/Text';
import {KeyboardContext} from '../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../contexts/MathfieldContext';
import {Atom} from './atom';

export class PlaceholderAtom extends Atom {
  constructor(context, options) {
    const value = options?.value || context.placeholderSymbol;
    super('placeholder', context, {
      value,
      command: '\\placeholder',
    });
    this.options = options;
  }

  render() {
    return <PlaceholderAtomRender atom={this} />;
  }
}

const PlaceholderAtomRender = ({atom}) => {
  const {showKeyboard} = useContext(KeyboardContext);
  const {setSelectedAtom} = useContext(MathfieldContext);
  return (
    <TouchableOpacity
      onPress={() => {
        showKeyboard();
        setSelectedAtom(atom);
      }}>
      <Text style={atom.context.placeOnKeyboard && {fontSize: 'inherit'}}>{atom.value}</Text>
    </TouchableOpacity>
  );
};
