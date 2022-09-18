import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Atom} from '../core/atom';

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

  render() {
    return <PhantomAtomRender atom={this} />;
  }
}

const PhantomAtomRender = ({atom}) => {
  console.log('PhantomAtomRender', atom);
  const propStyle = {
    visibility: atom.isInvisible ? 'hidden' : 'visible',
    height: atom.smashHeight ? 0 : '100%',
    width: atom.smashWidth ? 0 : '100%',
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
