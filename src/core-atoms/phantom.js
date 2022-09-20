import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MathfieldContext} from '../contexts/mathfield/MathfieldContext';
import {UiColors} from '../contexts/uiColors';
import {Atom} from '../core/atom';
import {MF_DEFAULT_FONT_SIZE} from '../styles/defaults';

/**
 * \phantom command draws space.
 * The box created by \phantom has width, height and depth equal to its argument.
 * In other words, \phantom creates horizontal and vertical space
 * equal to that of its argument, even though the argument isn't visible.
 */
export class PhantomAtom extends Atom {
  constructor(command, body, context, options) {
    super('phantom', context, {command});
    this.body = body;
    this.isInvisible = options.isInvisible ?? false;
    this.smashHeight = options.smashHeight ?? false;
    this.smashWidth = options.smashWidth ?? false;
  }

  static fromJson(json, context) {
    return new PhantomAtom(json.command, json.body, context, json);
  }

  toJson() {
    const options = {};
    if (this.isInvisible) {
      options.isInvisible = true;
    }
    if (this.smashDepth) {
      options.smashDepth = true;
    }
    if (this.smashHeight) {
      options.smashHeight = true;
    }
    if (this.smashWidth) {
      options.smashWidth = true;
    }
    return {...super.toJson(), ...options};
  }

  render() {
    return <PhantomAtomRender atom={this} />;
  }
}

const PhantomAtomRender = ({atom}) => {
  const {selectedAtom} = useContext(MathfieldContext);

  // width of space was calc experimental: fontSize/4  (see fontSize: 24 as example)
  const propStyle = {
    visibility: atom.isInvisible ? 'hidden' : 'visible',
    height: atom.smashHeight ? MF_DEFAULT_FONT_SIZE : '100%',
    width: atom.smashWidth ? MF_DEFAULT_FONT_SIZE / 4 : '100%',
    backgroundColor: selectedAtom == atom && UiColors.mathfieldSelected,
  };

  return (
    <View style={[styles.container, propStyle]}>
      <View style={styles.body}>{atom.body && atom.body.map((x, i) => <View key={i}>{x.render()}</View>)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  body: {flexDirection: 'row', alignItems: 'center'},
});
