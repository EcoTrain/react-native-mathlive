import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../../contexts/mathfield/MathfieldContext';
import {UiColors} from '../../contexts/uiColors';
import {joinLatex} from '../../core/tokenizer';
import {MF_DEFAULT_FONT_SIZE} from '../../styles/defaults';
import {latexToAsciiMath} from '../atom-to-ascii-math';
import {testDefaultMfValue} from './testDefaultValue';

export const MathfieldElement = () => {
  const {toggleKeyboardVisibility} = useContext(KeyboardContext);
  const {atoms, focused, selectedAtom} = useContext(MathfieldContext);
  const stylesThemed = styles(UiColors);

  // TODO: Rm before release
  testDefaultMfValue();

  const getSerializedLatex = () => {
    const serializedAtoms = atoms.map(x => x.serialize());
    const joinedLatex = joinLatex(serializedAtoms);
    return joinedLatex;
  };

  const getJson = () => {
    const jsonAtoms = atoms.map(x => x.toJson());
    return jsonAtoms;
  };

  const ascii = latexToAsciiMath(getSerializedLatex());

  // TODO: mfFormula overflow X (long frac)
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          stylesThemed.container,
          {
            borderColor: focused ? 'lightgray' : 'gray',
            borderWidth: focused ? 2 : 1,
          },
        ]}>
        <View style={stylesThemed.mfFormula}>
          {atoms.map((atom, i) => (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
              <View key={i}>{atom.render()}</View>
              {selectedAtom == atom && <Text>|</Text>}
            </View>
          ))}
        </View>
        <TouchableOpacity style={stylesThemed.mfKbBtn} onPress={() => toggleKeyboardVisibility()}>
          <Image style={stylesThemed.mfKbIcon} source={require('../../assets/icons/keyboard.png')} />
        </TouchableOpacity>
      </TouchableOpacity>
      <Text>1. serialized: {getSerializedLatex()}</Text>
      <Text>2. JSON: {JSON.stringify(getJson())}</Text>
      <Text>3. ASCII: {ascii.asciiString} </Text>
      <Text>4. ASCII meta: {JSON.stringify(ascii.metaObject)} </Text>
    </View>
  );
};

// eslint-disable-next-line no-shadow
const styles = UiColors =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: UiColors.mathfieldBg,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mfFormula: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    mfKbBtn: {
      height: MF_DEFAULT_FONT_SIZE,
      aspectRatio: '1/1',
      alignSelf: 'center',
    },
    mfKbIcon: {
      height: '100%',
      width: '100%',
    },
  });
