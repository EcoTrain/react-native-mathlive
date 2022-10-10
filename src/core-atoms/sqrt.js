import React, {useContext, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {KB_DEFAULT_FONT_SIZE, MF_DEFAULT_FONT_SIZE} from '../styles/defaults';
import {Atom} from '../core/atom';
import {MathfieldContext} from '../contexts/mathfield/MathfieldContext';
import {UiColors} from '../contexts/uiColors';

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
      mode: options.mode ?? 'math',
    });
    this.body = options.body ?? [];
  }

  static fromJson(json, context) {
    return new SqrtAtom(json.command, context, {
      ...json,
      index: json.above,
    });
  }

  toJson() {
    return super.toJson();
  }

  serialize(options) {
    let args = '';
    args += `{${this.bodyToLatex(options)}}`;
    return this.command + args;
  }

  render() {
    return <SqrtAtomRender atom={this} />;
  }
}

const SqrtAtomRender = ({atom}) => {
  const {selectedAtom} = useContext(MathfieldContext);
  const [size, setSize] = useState({width: 0, height: 0});

  const onKb = atom.context.placeOnKeyboard;
  const onChangeBodySize = e => {
    const {width, height} = e.nativeEvent.layout;
    setSize({width, height});
  };

  const getRoot = () => {
    const defaultFontSize = onKb ? KB_DEFAULT_FONT_SIZE : MF_DEFAULT_FONT_SIZE;
    const needSprut = !onKb && 0.5 * size.height > defaultFontSize;
    return (
      <View style={styles.rootContainer}>
        {needSprut && <View style={{flex: 1, borderRightWidth: 1}} />}
        <Text style={{fontSize: onKb ? KB_DEFAULT_FONT_SIZE : Math.max(24, 0.5 * size.height)}}>√</Text>
        {needSprut && <View style={{flex: 1}} />}
      </View>
    );
  };

  return (
    <View style={[styles.container, selectedAtom == atom && {backgroundColor: UiColors.mathfieldSelected}]}>
      {getRoot()}
      <View style={styles.body} onLayout={onChangeBodySize}>
        {atom.body.map((x, i) => (
          <View key={i}>{x.render()}</View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  body: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  rootContainer: {
    justifyContent: 'center',
  },
});
