import React, {useContext} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {VirtualKeyboardElement} from './keyboard';
import {UiColors} from '../../contexts/uiColors';

export const VirtualKeyboard = () => {
  const {isVisible, toggleKeyboardVisibility} = useContext(KeyboardContext);
  const stylesThemed = styles(UiColors);

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={() => {}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          toggleKeyboardVisibility();
        }}
        style={{
          // backgroundColor: 'transparent',
          flex: 1,
        }}>
        <View style={stylesThemed.kbWrapper}>
          <VirtualKeyboardElement />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = UiColors =>
  StyleSheet.create({
    kbWrapper: {
      width: '100%',
      minHeight: 50,
      backgroundColor: UiColors.keyboardBg,
    },
  });

// https://stackoverflow.com/questions/38499269/hide-component-when-clicking-outside
