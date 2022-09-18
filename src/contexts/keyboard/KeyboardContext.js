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

export const KeyboardContextProvider = ({children, customKeyboardLayers, customKeyboards, mergeKeyboards}) => {
  const [isVisible, setIsVisible] = useState(false);

  const virtualKeyboardLayers = mergeKeyboards
    ? Object.assign({}, DEFAULT_KEYBOARD_LAYERS, customKeyboardLayers)
    : DEFAULT_KEYBOARD_LAYERS;
  const virtualKeyboards = mergeKeyboards ? Object.assign({}, DEFAULT_KEYBOARDS, customKeyboards) : DEFAULT_KEYBOARDS;
  const actualKeyboards = Object.keys(virtualKeyboards);
  const [activeKbName, setActiveKbName] = useState(actualKeyboards[0]);

  console.log({customKeyboardLayers, customKeyboards, mergeKeyboards});
  console.log({virtualKeyboardLayers, virtualKeyboards});
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
