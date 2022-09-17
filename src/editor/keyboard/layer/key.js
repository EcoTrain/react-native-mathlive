import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {MathfieldContext} from '../../../contexts/MathfieldContext';
import {ThemeContext} from '../../../contexts/ThemeContext';
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
  const {UiColors} = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);

  const widthType = type.split(' ')?.[1];
  let width = widthType.split('w')?.[1];
  return <View style={[{flex: (1 / 10) * width}, stylesThemed.keyMargin]} />;
};

const KeyboardKeyWithFeedback = ({type, label, latex, insert, command}) => {
  const {mathfieldValue, setMathfieldValue, executeCommand} = useContext(MathfieldContext);
  const {UiColors} = useContext(ThemeContext);
  const stylesThemed = styles(UiColors);
  const shadow = makeShadow(20, 0.02);
  const [pressed, setPressed] = useState(false);

  const getTextPanel = text => {
    return <Text style={{fontFamily: 'KaTeX_Size4-Regular'}}>{text}</Text>;
  };
  const defineKeyCallbackAndLabel = () => {
    let keyCallback = () => {};
    let keyFrontPanel = label || '';

    if (type == 'action') {
      // TODO: define command labels & callbacks dict
      // TODO: define executeCommand in context
      keyFrontPanel = getTextPanel(label || command);
      keyCallback = () => executeCommand(command);
    } else if (latex) {
      const atoms = parseLatex(
        latex,
        {...defaultGlobalContext(), placeOnKeyboard: true},
        {
          parseMode: 'math',
          mathstyle: 'displaystyle',
          args: () => '\\placeholder{}',
        }
      );
      keyFrontPanel = atoms.map(x => x.render());
      keyCallback = () => {
        const newMfValue = mathfieldValue + latex;
        setMathfieldValue(newMfValue);
      };
    } else {
      // TODO: define command labels & callbacks dict
      // TODO: define executeCommand in context
      keyFrontPanel = getTextPanel(label);
      keyCallback = () => {
        const newMfValue = mathfieldValue + insert ?? label;
        setMathfieldValue(newMfValue);
      };
    }
    return {keyCallback, keyFrontPanel};
  };
  const {keyCallback, keyFrontPanel} = defineKeyCallbackAndLabel();

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
