import React, {useContext, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {Text} from '../../components/styled/Text';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../../contexts/MathfieldContext';
import {ThemeContext} from '../../contexts/ThemeContext';

export const MathfieldElement = props => {
  const {showKeyboard, hideKeyboard} = useContext(KeyboardContext);
  const {atoms, mathfieldValue} = useContext(MathfieldContext);

  const [focused, setFocus] = useState(false);

  const {UiColors} = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

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
        <View style={stylesThemed.mathfield}>
          <View style={stylesThemed.mfFormula}>
            {atoms.map((x, i) => (
              <View key={i}>{x.render()}</View>
            ))}
          </View>
          <TouchableOpacity
            style={stylesThemed.mfKbBtn}
            onPress={() => {
              setFocus(!focused);
              focused ? hideKeyboard() : showKeyboard();
            }}>
            <Image style={stylesThemed.mfKbIcon} source={require('../../assets/icons/keyboard.png')} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Text>{mathfieldValue}</Text>
    </View>
  );
};

const styles = UiColors =>
  StyleSheet.create({
    container: {
      minHeight: 40,
      borderRadius: 8,
      padding: 8,
      backgroundColor: UiColors.mathfieldBg,
    },
    mathfield: {flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
    mfFormula: {flex: 1, flexDirection: 'row', flexWrap: 'wrap'},
    mfKbBtn: {height: '100%', maxHeight: 40, aspectRatio: '1/1', marginLeft: 'auto', alignSelf: 'center'},
    mfKbIcon: {height: '100%', width: '100%', flex: 1},
  });
