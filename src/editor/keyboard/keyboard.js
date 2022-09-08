import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardContext } from '../../contexts/keyboard/KeyboardContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { KeyboardTopLabelsPanel } from './labelsPanel';
import { KeyboardLayer } from './layer';

export const VirtualKeyboardElement = () => {
  const { virtualKeyboards, virtualKeyboardLayers, activeKeyboardName } =
    useContext(KeyboardContext);
  const { UiColors } = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

  const getActiveKeyboard = () => {
    const activeLayerName = virtualKeyboards[activeKeyboardName]?.layer;
    const layer = virtualKeyboardLayers[activeLayerName];
    return <KeyboardLayer layer={layer} />;
  };

  return (
    <View style={stylesThemed.container}>
      <View style={stylesThemed.mainKeyboardPanel}>
        <KeyboardTopLabelsPanel />
        <View>{getActiveKeyboard()}</View>
      </View>
    </View>
  );
};

const styles = (UiColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    mainKeyboardPanel: {
      maxWidth: 800,
      width: '100%',
      marginVertical: 10,
    },
  });
