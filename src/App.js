import React from 'react';
import {KeyboardContextProvider} from './contexts/keyboard/KeyboardContext';
import {MathfieldContextProvider} from './contexts/MathfieldContext';
import {ThemeContextProvider} from './contexts/ThemeContext';
import {VirtualKeyboard} from './editor/keyboard';
import {Mathfield} from './editor/mathfield';

export const App = () => {
  return (
    <ThemeContextProvider>
      <MathfieldContextProvider>
        <KeyboardContextProvider>
          <Mathfield />
          <VirtualKeyboard />
        </KeyboardContextProvider>
      </MathfieldContextProvider>
    </ThemeContextProvider>
  );
};
