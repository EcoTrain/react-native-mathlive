import React from 'react';
import {KeyboardContextProvider} from './contexts/keyboard/KeyboardContext';
import {MathfieldContextProvider} from './contexts/MathfieldContext';
import {ThemeContextProvider} from './contexts/ThemeContext';
import {VirtualKeyboard} from './editor/keyboard';
import {MathfieldElement} from './editor/mathfield';

let MathfieldValue = '';
const changeMathfieldValue = value => {
  MathfieldValue = value;
};
export const getMathfieldValue = () => {
  return MathfieldValue;
};

export const Mathfield = ({customKeyboardLayers, customKeyboards, mergeKeyboards}) => {
  return (
    <ThemeContextProvider>
      <MathfieldContextProvider
        onChangeValue={value => {
          changeMathfieldValue(value);
        }}>
        <KeyboardContextProvider
          customKeyboardLayers={customKeyboardLayers}
          customKeyboards={customKeyboards}
          mergeKeyboards={mergeKeyboards}>
          <MathfieldElement />
          <VirtualKeyboard />
        </KeyboardContextProvider>
      </MathfieldContextProvider>
    </ThemeContextProvider>
  );
};
