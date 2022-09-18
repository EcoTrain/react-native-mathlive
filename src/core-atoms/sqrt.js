import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {KB_DEFAULT_FONT_SIZE} from '../styles/defaults';
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
export class SqrtAtom extends Atom {
  constructor(command, context, options) {
    super('sqrt', context, {
      command,
    });
    this.body = options.body ?? [];
  }

  render() {
    return <SqrtAtomRender atom={this} />;
  }
}

const SqrtAtomRender = ({atom}) => {
  const [size, setSize] = useState({width: 0, height: 0});

  const onKb = atom.context.placeOnKeyboard;
  const onChangeBodySize = e => {
    const {width, height} = e.nativeEvent.layout;
    setSize({width: width, height: height});
  };

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', height: '100%', justifyContent: 'center'}}>
        {!onKb && size.height > 40 && <Text style={{borderRightWidth: 1, flex: 1}}> </Text>}
        <Text style={{fontSize: onKb ? KB_DEFAULT_FONT_SIZE : Math.max(24, 0.6 * size.height)}}>√</Text>
      </View>
      <View style={styles.body} onLayout={onChangeBodySize}>
        {atom.body.map((x, i) => (
          <View key={i}>{x.render()}</View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  body: {flexDirection: 'row', alignItems: 'center', borderTopWidth: 1},
  root: {},
});
