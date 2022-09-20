import React, {createContext, useEffect, useState} from 'react';
import {defineCommands} from './commands';
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

export const KeyboardContextProvider = ({children, kbConfig}) => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Define commands for executeCommand on key press
   * (Redefine on every update context)
   */
  defineCommands();

  const virtualKeyboardLayers = kbConfig.mergeKeyboards
    ? Object.assign({}, DEFAULT_KEYBOARD_LAYERS, kbConfig.customKeyboardLayers)
    : DEFAULT_KEYBOARD_LAYERS;
  const virtualKeyboards = kbConfig.mergeKeyboards
    ? Object.assign({}, DEFAULT_KEYBOARDS, kbConfig.customKeyboards)
    : DEFAULT_KEYBOARDS;
  const actualKeyboards = Object.keys(virtualKeyboards);
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
    virtualKeyboardLayers,
    virtualKeyboards,
    actualKeyboards: actualKeyboards,
    activeKeyboardName: activeKbName,
    setActiveKeyboardName: setActiveKbName,
  };

  return <KeyboardContext.Provider value={defaultContextValues}>{children}</KeyboardContext.Provider>;
};
