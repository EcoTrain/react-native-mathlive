import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {UiColors} from '../../contexts/uiColors';
import {VirtualKeyboardElement} from './keyboard';

export const VirtualKeyboard = () => {
  const {isVisible, toggleKeyboardVisibility} = useContext(KeyboardContext);
  const stylesThemed = styles(UiColors);

  return (
    isVisible && (
      <TouchableOpacity activeOpacity={1} style={stylesThemed.fullscreenContainer}>
        <TouchableOpacity
          style={stylesThemed.kbOutsideFiller}
          onPress={() => {
            toggleKeyboardVisibility();
          }}
        />
        <View style={stylesThemed.kbWrapper}>
          <VirtualKeyboardElement />
        </View>
      </TouchableOpacity>
    )
  );
};

// eslint-disable-next-line no-shadow
const styles = UiColors =>
  StyleSheet.create({
    fullscreenContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      cursor: 'default',
      zIndex: 1,
    },
    kbOutsideFiller: {
      flex: 1,
      cursor: 'default',
    },
    kbWrapper: {
      width: '100%',
      minHeight: 50,
      backgroundColor: UiColors.keyboardBg,
    },
  });
