import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { MathfieldContext } from '../../../contexts/MathfieldContext';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { makeShadow } from '../../../styles/shadow';

export const KeyboardKey = (keyConfig) => {
  const { type } = keyConfig;

  // TODO: separate keys by params
  return type && type.includes('separator') ? (
    <KeyboardKeySeparator type={type} />
  ) : (
    <KeyboardKeyWithFeedback {...keyConfig} />
  );
};

const KeyboardKeySeparator = ({ type }) => {
  const { UiColors } = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

  const widthType = type.split(' ')?.[1];
  let width = widthType.split('w')?.[1];
  return <View style={[{ flex: (1 / 10) * width }, stylesThemed.keyMargin]} />;
};

const KeyboardKeyWithFeedback = ({ type, label, latex, insert, command }) => {
  const { mathfieldValue, setMathfieldValue } = useContext(MathfieldContext);
  const { UiColors } = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);
  const shadow = makeShadow(20, 0.02);
  const [pressed, setPressed] = useState(false);

  const defineKeyCallbackAndLabel = () => {
    let keyCallback = () => {};
    let keyLabel = label || '';

    if (type == 'action') {
      // TODO: define command labels & callbacks dict
      // TODO: define executeCommand in context
      keyLabel = command;
      keyCallback = () => {
        console.log({ command });
      };
    } else if (latex) {
      // TODO: define LaTex labels & callbacks dict
      keyLabel = latex;
      keyCallback = () => {
        console.log({ latex });
      };
    } else {
      // TODO: define command labels & callbacks dict
      // TODO: define executeCommand in context
      keyLabel = label;
      keyCallback = () => {
        const newMfValue = mathfieldValue + insert;
        setMathfieldValue(newMfValue);
      };
    }
    return { keyCallback, keyLabel };
  };
  const { keyCallback, keyLabel } = defineKeyCallbackAndLabel();

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
      onPress={keyCallback}
    >
      <Text
        style={{
          fontFamily: 'KaTeX_Size4-Regular',
        }}
      >
        {keyLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (UiColors) =>
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
