import React from 'react';
import {KeyboardContextProvider} from './contexts/keyboard/KeyboardContext';
import {MathfieldContextProvider} from './contexts/MathfieldContext';
import {ThemeContextProvider} from './contexts/ThemeContext';
import {VirtualKeyboard} from './editor/keyboard';
import {MathfieldElement} from './editor/mathfield';

export const Mathfield = () => {
  return (
    <ThemeContextProvider>
      <MathfieldContextProvider>
        <KeyboardContextProvider>
          <MathfieldElement />
          <VirtualKeyboard />
        </KeyboardContextProvider>
      </MathfieldContextProvider>
    </ThemeContextProvider>
  );
};
