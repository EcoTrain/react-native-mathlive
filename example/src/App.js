import * as React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {Mathfield} from 'react-native-mathlive';

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
        <Mathfield />
        <Text style={{height: 60, width: '100%', backgroundColor: '#acb8bc'}}>test text filler</Text>
      </View>
    </View>
  );
}
