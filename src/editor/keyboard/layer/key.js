import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {UiColors} from '../../../contexts/uiColors';
import {executeCommand} from '../../../contexts/keyboard/commands';
import {defaultGlobalContext} from '../../../core/context-utils';
import {parseLatex} from '../../../core/parser';
import {makeShadow} from '../../../styles/shadow';

export const KeyboardKey = keyConfig => {
  const {type} = keyConfig;

  // TODO: separate keys by params
  return type && type.includes('separator') ? (
    <KeyboardKeySeparator type={type} />
  ) : (
    <KeyboardKeyWithFeedback {...keyConfig} />
  );
};

const KeyboardKeySeparator = ({type}) => {
  const stylesThemed = styles(UiColors);

  const widthType = type.split(' ')?.[1];
  let width = widthType.split('w')?.[1];
  return <View style={[{flex: (1 / 10) * width}, stylesThemed.keyMargin]} />;
};

const KeyboardKeyWithFeedback = ({type, label, latex, insert, command}) => {
  const stylesThemed = styles(UiColors);
  const shadow = makeShadow(20, 0.02);
  const [pressed, setPressed] = useState(false);

  const getTextPanel = text => {
    return <Text style={{fontFamily: 'KaTeX_Size4-Regular'}}>{text}</Text>;
  };

  const parseKeyValue = ({value, placeOnKeyboard}) => {
    const atoms = parseLatex(
      value,
      {...defaultGlobalContext(), placeOnKeyboard},
      {
        parseMode: 'math',
        mathstyle: 'displaystyle',
        // args: () => '\\placeholder{}',
      }
    );
    return atoms;
  };

  const defineKeyFrontPanel = () => {
    let keyFrontPanel = label || '';
    if (type == 'action') {
      keyFrontPanel = getTextPanel(label || command);
    } else if (latex) {
      const atoms = parseKeyValue({value: latex, placeOnKeyboard: true});
      keyFrontPanel = atoms.map((x, i) => <View key={i}>{x.render()}</View>);
    } else {
      keyFrontPanel = getTextPanel(label);
    }
    return keyFrontPanel;
  };

  const defineKeyCallback = () => {
    let keyCallback = () => {};
    if (type == 'action') {
      keyCallback = () => {
        executeCommand({command});
      };
    } else if (latex) {
      const atoms = parseKeyValue({value: latex});
      keyCallback = () => {
        executeCommand({command: 'addAtoms', options: {atoms}});
      };
    } else {
      const atoms = parseKeyValue({value: insert ?? label, placeOnKeyboard: false});
      keyCallback = () => {
        executeCommand({command: 'addAtoms', options: {atoms}});
      };
    }
    return keyCallback;
  };

  const keyFrontPanel = defineKeyFrontPanel();
  const keyCallback = defineKeyCallback();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        stylesThemed.keyContainer,
        stylesThemed.keyMargin,
        shadow,
        {
          backgroundColor: pressed ? UiColors.kbKeyActiveBg : UiColors.kbKeyBg,
        },
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={keyCallback}>
      <View style={{cursorPointer: 'none'}}>{keyFrontPanel}</View>
    </TouchableOpacity>
  );
};

const styles = UiColors =>
  StyleSheet.create({
    keyMargin: {
      margin: 2,
      padding: 5,
    },
    keyContainer: {
      flex: 1,
      height: 40,
      minWidth: 40,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
  });
