import React from 'react';
import {KeyboardContextProvider} from './contexts/keyboard/KeyboardContext';
import {MathfieldContextProvider} from './contexts/MathfieldContext';
import {ThemeContextProvider} from './contexts/ThemeContext';
import {VirtualKeyboard} from './editor/keyboard';
import {MathfieldElement} from './editor/mathfield';

let MathfieldValue = '';
const changeMathfieldValue = value => {
  MathfieldValue = value;
  console.log('changeMathfieldValue', {MathfieldValue});
};
export const getMathfieldValue = () => {
  console.log('getMathfieldValue', {MathfieldValue});
  return MathfieldValue;
};

export const Mathfield = () => {
  return (
    <ThemeContextProvider>
      <MathfieldContextProvider
        onChangeValue={value => {
          changeMathfieldValue(value);
        }}>
        <KeyboardContextProvider>
          <MathfieldElement />
          <VirtualKeyboard />
        </KeyboardContextProvider>
      </MathfieldContextProvider>
    </ThemeContextProvider>
  );
};
