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
  mathstyleName;

  constructor(command, above, below, context, options) {
    super('genfrac', context, {
      command,
      serialize: options.serialize,
    });
    this.above = above;
    this.below = below;
    this.hasBarLine = options?.hasBarLine ?? true;
    this.mathstyleName = options?.mathstyleName;
  }

  render(context) {
    console.log({...this});
    return <GenfracAtomRender context={context} above={this.above} below={this.below} />;
  }
}

const GenfracAtomRender = ({context, above, below}) => {
  console.log('GenfracAtomRender', {context, above, below});
  return (
    <View style={styles.container}>
      <View style={styles.operand}>
        {above.map((x, i) => (
          <View key={i}>{x.render(context)}</View>
        ))}
      </View>
      <View style={styles.delimeter}></View>
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
