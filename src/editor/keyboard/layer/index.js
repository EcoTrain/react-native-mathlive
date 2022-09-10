import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardKey} from './key';

export const KeyboardLayer = ({layer}) => {
  return layer.rows.map((row, ilayer) => (
    <View key={ilayer} style={styles.kbRow}>
      {row.map((keyConfig, irow) => (
        <KeyboardKey key={irow} {...keyConfig} />
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
