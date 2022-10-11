import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardContextProvider} from './contexts/keyboard/KeyboardContext';
import {MathfieldContextProvider} from './contexts/mathfield/MathfieldContext';
import {VirtualKeyboard} from './editor/keyboard';
import {MathfieldElement} from './editor/mathfield';

import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {View} from 'react-native';

export const Mathfield = ({customKeyboardLayers, customKeyboards, mergeKeyboards}) => {
  const [fontsLoaded] = useFonts({
    'KaTeX-Size1-Regular': require('./styles/fonts/KaTeX_Size1-Regular.ttf'),
    'KaTeX-Size4-Regular': require('./styles/fonts/KaTeX_Size4-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <MathfieldContextProvider>
      <KeyboardContextProvider kbConfig={{customKeyboardLayers, customKeyboards, mergeKeyboards}}>
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
          <MathfieldElement />
          <VirtualKeyboard />
        </View>
      </KeyboardContextProvider>
    </MathfieldContextProvider>
  );
};
