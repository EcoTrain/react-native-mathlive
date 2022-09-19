import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../components/styled/Text';
import {KeyboardContext} from '../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../contexts/MathfieldContext';
import {KB_DEFAULT_FONT_SIZE} from '../styles/defaults';
import {Atom} from '../core/atom';

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
  const {selectedAtom, setSelectedAtom} = useContext(MathfieldContext);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: selectedAtom == atom && '#caeeee',
      }}
      onPress={() => {
        showKeyboard();
        setSelectedAtom(atom);
      }}>
      <Text style={atom.context.placeOnKeyboard && {fontSize: KB_DEFAULT_FONT_SIZE}}>{atom.value}</Text>
    </TouchableOpacity>
  );
};
