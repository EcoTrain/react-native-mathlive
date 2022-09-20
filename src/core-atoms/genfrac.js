import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MathfieldContext} from '../contexts/mathfield/MathfieldContext';
import {UiColors} from '../contexts/uiColors';
import {Atom} from '../core/atom';

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

  static fromJson(json, context) {
    return new GenfracAtom(json.command, json.above, json.below, context, json);
  }

  toJson() {
    const options = {};
    return {...super.toJson(), ...options};
  }

  serialize() {
    return this.command + `{${this.aboveToLatex()}}` + `{${this.belowToLatex()}}`;
  }

  render() {
    return <GenfracAtomRender atom={this} />;
  }
}

const GenfracAtomRender = ({atom}) => {
  const {selectedAtom} = useContext(MathfieldContext);
  const hasBarLine = atom.options?.hasBarLine ?? true;
  return (
    <View style={[styles.container, selectedAtom == atom && {backgroundColor: UiColors.mathfieldSelected}]}>
      <View style={styles.operand}>
        {atom.above.map((x, i) => (
          <View key={i}>{x.render()}</View>
        ))}
      </View>
      {hasBarLine && <View style={styles.delimeter} />}
      <View style={styles.operand}>
        {atom.below.map((x, i) => (
          <View key={i}>{x.render()}</View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', height: '100%', justifyContent: 'center', alignContent: 'center'},
  operand: {flexDirection: 'row', alignSelf: 'center'},
  delimeter: {borderBottomWidth: 1},
});
