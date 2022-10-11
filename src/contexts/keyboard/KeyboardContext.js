import React, {createContext, useContext, useEffect, useState} from 'react';
import {MathfieldContext} from '../mathfield/MathfieldContext';
import {defineCommands} from './commands';
import {DEFAULT_KEYBOARDS, DEFAULT_KEYBOARD_LAYERS} from './defaultKeyboard';

export const KeyboardContext = createContext({
  isVisible: false,
  showKeyboard: () => {},
  hideKeyboard: () => {},
  toggleKeyboardVisibility: () => {},
  virtualKeyboardLayers: DEFAULT_KEYBOARD_LAYERS || {},
  virtualKeyboards: DEFAULT_KEYBOARDS || {},
  actualKeyboards: Object.keys(DEFAULT_KEYBOARDS) || {},
  activeKeyboardName: Object.keys(DEFAULT_KEYBOARDS)[0] || '',
  setActiveKeyboardName: () => {},
});

export const KeyboardContextProvider = ({children, kbConfig}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {setFocus} = useContext(MathfieldContext);

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
      setFocus(true);
    },
    hideKeyboard: () => {
      setIsVisible(false);
      setFocus(false);
    },
    toggleKeyboardVisibility: () => {
      setIsVisible(!isVisible);
      setFocus(!isVisible);
    },
    virtualKeyboardLayers,
    virtualKeyboards,
    actualKeyboards: actualKeyboards,
    activeKeyboardName: activeKbName,
    setActiveKeyboardName: setActiveKbName,
  };

  return <KeyboardContext.Provider value={defaultContextValues}>{children}</KeyboardContext.Provider>;
};
