import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardContext} from '../../contexts/keyboard/KeyboardContext';
import {UiColors} from '../../contexts/uiColors';

export const KeyboardTopLabelsPanel = () => {
  const {virtualKeyboards, actualKeyboards} = useContext(KeyboardContext);
  const stylesThemed = styles(UiColors);

  const getKeyboardLabels = () => {
    const labels = [];
    actualKeyboards.map((kbLayoutName, ikb) => {
      const keyboardLayout = virtualKeyboards[kbLayoutName];
      if (keyboardLayout) {
        labels.push(<KeyboardTopLabelItem key={ikb} label={keyboardLayout.label} kbName={kbLayoutName} />);
      }
    });
    return labels;
  };

  return <View style={stylesThemed.labelsPanel}>{getKeyboardLabels()}</View>;
};

const KeyboardTopLabelItem = ({label, kbName}) => {
  const {activeKeyboardName, setActiveKeyboardName} = useContext(KeyboardContext);
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

// eslint-disable-next-line no-shadow
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
