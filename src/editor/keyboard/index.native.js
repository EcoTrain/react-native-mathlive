import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {VirtualKeyboardElement} from './keyboard';
import {UiColors} from '../../contexts/uiColors';

export const VirtualKeyboard = () => {
  const {isVisible} = useContext(KeyboardContext);
  const stylesThemed = styles(UiColors);

  return (
    isVisible && (
      <View style={stylesThemed.container}>
        <VirtualKeyboardElement />
      </View>
    )
  );
};

const styles = UiColors =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      minHeight: 50,
      backgroundColor: UiColors.keyboardBg,
    },
  });
