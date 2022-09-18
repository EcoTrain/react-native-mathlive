import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Atom} from './atom';

/**
 * Genfrac -- Generalized Fraction
 *
 * Decompose fractions, binomials, and in general anything made
 * of a numerator and denominator, optionally separated by a fraction bar,
 * and optionally surrounded by delimiters (parentheses, brackets, etc...).
 *
 * Depending on the type of fraction the mathstyle is either
 * displaystyle or textstyle. This value can also be set to 'auto',
 * to indicate it should use the current mathstyle
 */
export class GenfracAtom extends Atom {
  constructor(command, above, below, context, options) {
    super('genfrac', context, {
      command,
    });
    this.above = above;
    this.below = below;
    this.options = options;
  }

  render() {
    return <GenfracAtomRender context={this.context} above={this.above} below={this.below} options={this.options} />;
  }
}

const GenfracAtomRender = ({context, above, below, options}) => {
  const hasBarLine = options?.hasBarLine ?? true;
  return (
    <View style={styles.container}>
      <View style={styles.operand}>
        {above.map((x, i) => (
          <View key={i}>{x.render(context)}</View>
        ))}
      </View>
      {hasBarLine && <View style={styles.delimeter}></View>}
      <View style={styles.operand}>
        {below.map((x, i) => (
          <View key={i}>{x.render(context)}</View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', justifyContent: 'center'},
  operand: {flexDirection: 'row', alignSelf: 'center'},
  delimeter: {borderBottomWidth: 1},
});
