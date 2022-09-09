import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {ThemeContext} from '../../contexts/ThemeContext';

export const KeyboardTopLabelsPanel = () => {
  const {virtualKeyboards, virtualKeyboardLayers, actualKeyboards, activeKeyboardName} = useContext(KeyboardContext);
  const {UiColors} = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

  const getKeyboardLabels = () => {
    const labels = [];
    actualKeyboards.map(kbLayoutName => {
      const keyboardLayout = virtualKeyboards[kbLayoutName];
      if (keyboardLayout) {
        labels.push(<KeyboardTopLabelItem label={keyboardLayout.label} kbName={kbLayoutName} />);
      }
    });
    return labels;
  };

  return <View style={stylesThemed.labelsPanel}>{getKeyboardLabels()}</View>;
};

const KeyboardTopLabelItem = ({label, kbName}) => {
  const {activeKeyboardName, setActiveKeyboardName} = useContext(KeyboardContext);
  const {UiColors} = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

  const isActive = activeKeyboardName == kbName;

  return (
    <TouchableOpacity style={stylesThemed.labelPanelItem} onPress={() => setActiveKeyboardName(kbName)}>
      <Text
        style={[
          stylesThemed.labelPanelItemText,
          {
            color: isActive ? UiColors.textSelected : UiColors.textCold,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = UiColors =>
  StyleSheet.create({
    labelsPanel: {
      flex: 1,
      flexDirection: 'row',
    },
    labelPanelItem: {
      padding: 5,
    },
    labelPanelItemText: {
      fontWeight: 'bold',
    },
  });