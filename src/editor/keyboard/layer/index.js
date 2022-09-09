import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardKey} from './key';

export const KeyboardLayer = ({layer}) => {
  return layer.rows.map((row, i) => (
    <View key={i} style={styles.kbRow}>
      {row.map(keyConfig => (
        <KeyboardKey {...keyConfig} />
      ))}
    </View>
  ));
};

const styles = StyleSheet.create({
  kbRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
