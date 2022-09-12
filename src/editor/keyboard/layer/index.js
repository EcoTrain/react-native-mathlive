import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardKey} from './key';

export const KeyboardLayer = ({layer}) => {
  return layer.rows.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.kbRow}>
      {row.map((keyConfig, keyIndex) => (
        <KeyboardKey key={keyIndex} {...keyConfig} />
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
