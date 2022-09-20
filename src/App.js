import React from 'react';
import {KeyboardContextProvider} from './contexts/keyboard/KeyboardContext';
import {MathfieldContextProvider} from './contexts/mathfield/MathfieldContext';
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
    <MathfieldContextProvider
      onChangeValue={value => {
        changeMathfieldValue(value);
      }}>
      <KeyboardContextProvider kbConfig={{customKeyboardLayers, customKeyboards, mergeKeyboards}}>
        <MathfieldElement />
        <VirtualKeyboard />
      </KeyboardContextProvider>
    </MathfieldContextProvider>
  );
};
