import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {KeyboardContext} from '../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../contexts/mathfield/MathfieldContext';
import {UiColors} from '../contexts/uiColors';
import {Atom} from '../core/atom';
import {KB_DEFAULT_FONT_SIZE} from '../styles/defaults';

export class TextAtom extends Atom {
  constructor(command, value, context) {
    super('text', context, {
      command,
      mode: 'text',
    });
    this.value = value;
  }

  static fromJson(json, context) {
    return new TextAtom(json.command, json.value, context);
  }

  toJson() {
    return super.toJson();
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
      style={[styles.container, selectedAtom == atom && {backgroundColor: UiColors.mathfieldSelected}]}
      onPress={() => {
        showKeyboard();
        setSelectedAtom(atom);
      }}>
      <Text style={atom.context.placeOnKeyboard && {fontSize: KB_DEFAULT_FONT_SIZE}}>{atom.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});
