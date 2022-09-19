import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {KeyboardContext} from '../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../contexts/MathfieldContext';
import {Atom} from '../core/atom';
import {KB_DEFAULT_FONT_SIZE} from '../styles/defaults';

export class TextAtom extends Atom {
  constructor(command, value, context) {
    super('text', context, {
      command,
    });
    this.value = value;
  }

  serialize(_options) {
    return this.value;
  }

  render() {
    return <TextAtomRender atom={this} />;
  }
}

const TextAtomRender = ({atom}) => {
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
      <View style={{flexDirection: 'row'}}>
        <Text style={atom.context.placeOnKeyboard && {fontSize: KB_DEFAULT_FONT_SIZE}}>{atom.value}</Text>
        {selectedAtom == atom && <Text>|</Text>}
      </View>
    </TouchableOpacity>
  );
};
