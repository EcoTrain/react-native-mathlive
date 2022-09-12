import React, {useContext, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {MathfieldContext} from '../../contexts/MathfieldContext';
import {ThemeContext} from '../../contexts/ThemeContext';

export const MathfieldElement = props => {
  const {showKeyboard, hideKeyboard} = useContext(KeyboardContext);
  const {mathfieldValue} = useContext(MathfieldContext);
  const [focused, setFocus] = useState(false);

  const {UiColors} = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        stylesThemed.container,
        {
          borderColor: focused ? 'lightgray' : 'gray',
          borderWidth: focused ? 2 : 1,
        },
      ]}
      onPress={() => {
        setFocus(true);
        showKeyboard();
      }}
      // TODO: blur mathfield, save keyboard
      onBlur={e => {
        console.log('onBlur', e);
        // setFocus(false);
        // hideKeyboard();
      }}>
      <Text style={{height: '100%'}}>{mathfieldValue}</Text>
    </TouchableOpacity>
  );
};

const styles = UiColors =>
  StyleSheet.create({
    container: {
      height: 40,
      minHeight: 40,
      borderRadius: 8,
      padding: 8,
      backgroundColor: UiColors.mathfieldBg,
    },
  });
