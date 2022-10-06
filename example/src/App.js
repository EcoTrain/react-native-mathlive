import * as React from 'react';

import {Text, View} from 'react-native';
import {Mathfield} from 'react-native-mathlive';
import {CUSTOM_KEYBOARDS, CUSTOM_KEYBOARD_LAYERS} from './defaultKeyboard';

export default function App() {
  return (
    <View
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{height: '80%', width: '80%', backgroundColor: 'lightblue'}}>
        <Text style={{height: 60, width: '100%', backgroundColor: '#acb8bc'}}>test text filler</Text>
        <Mathfield
          customKeyboardLayers={CUSTOM_KEYBOARD_LAYERS}
          customKeyboards={CUSTOM_KEYBOARDS}
          mergeKeyboards={true}
        />
        <Mathfield
          customKeyboardLayers={CUSTOM_KEYBOARD_LAYERS}
          customKeyboards={CUSTOM_KEYBOARDS}
          mergeKeyboards={true}
        />
        {/* <Button onPress={onPressGet} title={'Get result'} /> */}
      </View>
    </View>
  );
}
