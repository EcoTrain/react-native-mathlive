import React, {createContext, useState} from 'react';
import {DEFAULT_KEYBOARDS, DEFAULT_KEYBOARD_LAYERS} from './defaultKeyboard';

export const KeyboardContext = createContext({
  isVisible: false,
  showKeyboard: () => {},
  hideKeyboard: () => {},
  toggleKeyboardVisibility: () => {},
  virtualKeyboardLayers: {},
  virtualKeyboards: {},
  actualKeyboards: [],
  activeKeyboardName: '',
  setActiveKeyboardName: () => {},
});

export const KeyboardContextProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const actualKeyboards = ['basic', 'geometry'];
  const [activeKbName, setActiveKbName] = useState(actualKeyboards[0]);

  const defaultContextValues = {
    isVisible,
    showKeyboard: () => {
      setIsVisible(true);
    },
    hideKeyboard: () => {
      setIsVisible(false);
    },
    toggleKeyboardVisibility: () => {
      setIsVisible(!isVisible);
    },
    virtualKeyboardLayers: DEFAULT_KEYBOARD_LAYERS,
    virtualKeyboards: DEFAULT_KEYBOARDS,
    actualKeyboards: actualKeyboards,
    activeKeyboardName: activeKbName,
    setActiveKeyboardName: setActiveKbName,
  };

  return <KeyboardContext.Provider value={defaultContextValues}>{children}</KeyboardContext.Provider>;
};
