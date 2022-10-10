import React, {useContext} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, Text} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {UiColors} from '../../contexts/uiColors';
import {VirtualKeyboardElement} from './keyboard';

export const VirtualKeyboard = () => {
  const {isVisible, toggleKeyboardVisibility} = useContext(KeyboardContext);
  const stylesThemed = styles(UiColors);

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={() => {}}>
      <TouchableOpacity activeOpacity={1} onPress={() => toggleKeyboardVisibility()} style={{flex: 1}} />
      <View style={stylesThemed.kbWrapper}>
        <VirtualKeyboardElement />
      </View>
    </Modal>
  );
};

// eslint-disable-next-line no-shadow
const styles = UiColors =>
  StyleSheet.create({
    kbWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      minHeight: 50,
      backgroundColor: UiColors.keyboardBg,
    },
  });
