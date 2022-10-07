import React from 'react';
import {KeyboardContextProvider} from './contexts/keyboard/KeyboardContext';
import {MathfieldContextProvider} from './contexts/mathfield/MathfieldContext';
import {VirtualKeyboard} from './editor/keyboard';
import {MathfieldElement} from './editor/mathfield';

export const Mathfield = ({customKeyboardLayers, customKeyboards, mergeKeyboards}) => {
  return (
    <MathfieldContextProvider>
      <KeyboardContextProvider kbConfig={{customKeyboardLayers, customKeyboards, mergeKeyboards}}>
        <MathfieldElement />
        <VirtualKeyboard />
      </KeyboardContextProvider>
    </MathfieldContextProvider>
  );
};
