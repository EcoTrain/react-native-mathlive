import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardContext } from '../../contexts/keyboard/KeyboardContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { VirtualKeyboardElement } from './keyboard';
import { KeyboardLayer } from './layer';

export const VirtualKeyboard = () => {
  const { isVisible } = useContext(KeyboardContext);
  const { UiColors } = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

  return (
    <View
      style={[
        stylesThemed.container,
        {
          visibility: isVisible ? 'visible' : 'hidden',
        },
      ]}
    >
      <VirtualKeyboardElement />
    </View>
  );
};

const styles = (UiColors) =>
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
