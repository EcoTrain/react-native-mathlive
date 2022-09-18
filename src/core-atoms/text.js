import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {KeyboardContext} from '../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../contexts/MathfieldContext';
import {Atom} from '../core/atom';

export class TextAtom extends Atom {
  constructor(command, value, context) {
    super('text', context, {
      command,
    });
    this.value = value;
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
      style={{height: '100%', justifyContent: 'center', alignContent: 'center'}}
      onPress={() => {
        showKeyboard();
        setSelectedAtom(atom);
      }}>
      <View style={{flexDirection: 'row', backgroundColor: 'lightgrey'}}>
        <Text style={atom.context.placeOnKeyboard && {fontSize: 'inherit'}}>{atom.value}</Text>
        {selectedAtom == atom && <Text>|</Text>}
      </View>
    </TouchableOpacity>
  );
};
