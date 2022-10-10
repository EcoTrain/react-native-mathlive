import React, {useContext} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {KeyboardContext} from '../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../contexts/mathfield/MathfieldContext';
import {KB_DEFAULT_FONT_SIZE} from '../styles/defaults';
import {Atom} from '../core/atom';
import {UiColors} from '../contexts/uiColors';

export class PlaceholderAtom extends Atom {
  constructor(context, options) {
    const value = options?.value || context.placeholderSymbol;
    super('placeholder', context, {
      value,
      command: '\\placeholder',
      mode: options?.mode ?? 'math',
    });
    this.options = options;
  }

  static fromJson(json, context) {
    return new PlaceholderAtom(context, json);
  }

  toJson() {
    const result = super.toJson();
    if (this.placeholderId) {
      result.placeholderId = this.placeholderId;
    }
    if (this.value === this.context.placeholderSymbol) {
      delete result.value;
    }
    if (this.defaultValue) {
      result.defaultValue = this.defaultValue.map(x => x.toJson());
    }

    return result;
  }

  serialize(_options) {
    let value = this.value ?? '';
    if (value === this.context.placeholderSymbol) {
      value = '';
    }
    return `\\placeholder{${value}}`;
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
      disabled={atom.context.placeOnKeyboard}
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
