import * as React from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';
import {Mathfield, getMathfieldValue} from 'react-native-mathlive';

export default function App() {
  const onPressGet = () => {
    const mfVal = getMathfieldValue();
  };

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
        <Mathfield />
        <Button onPress={onPressGet} title={'Get result'} />
      </View>
    </View>
  );
}
