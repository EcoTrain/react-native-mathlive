import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {UiColors} from '../../contexts/uiColors';
import {KeyboardTopLabelsPanel} from './labelsPanel';
import {KeyboardLayer} from './layer';

export const VirtualKeyboardElement = () => {
  const {virtualKeyboards, virtualKeyboardLayers, activeKeyboardName} = useContext(KeyboardContext),
    stylesThemed = styles(UiColors),
    getActiveKeyboard = () => {
      const activeLayerName = virtualKeyboards[activeKeyboardName]?.layer,
        layer = virtualKeyboardLayers[activeLayerName];
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

// eslint-disable-next-line no-shadow
const styles = UiColors =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    mainKeyboardPanel: {
      maxWidth: 800,
      width: '100%',
      marginVertical: 10,
      marginHorizontal: 10,
    },
  });
