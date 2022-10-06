import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {MathfieldContext} from '../contexts/mathfield/MathfieldContext';
import {UiColors} from '../contexts/uiColors';
import {Atom} from '../core/atom';
import {MF_DEFAULT_FONT_SIZE} from '../styles/defaults';

export class GroupAtom extends Atom {
  constructor(args, context, options) {
    super('group', context, {
      command: options?.command,
    });
    this.body = args;
    this.latexOpen = options?.latexOpen;
    this.latexClose = options?.latexClose;
  }

  static fromJson(json, context) {
    return new GroupAtom(json.body, context, json);
  }

  toJson() {
    const options = {};
    if (this.latexOpen) {
      options.latexOpen = this.latexOpen;
    }
    if (this.latexClose) {
      options.latexClose = this.latexClose;
    }

    return {...super.toJson(), ...options};
  }

  serialize() {
    let result = this.bodyToLatex();

    if (typeof this.latexOpen === 'string') {
      result = this.latexOpen + result + this.latexClose;
    }

    return result;
  }

  render() {
    return <GroupAtomRender atom={this} />;
  }
}

const GroupAtomRender = ({atom}) => {
  const {selectedAtom} = useContext(MathfieldContext);

  return (
    <View style={styles.container}>
      <View style={styles.body}>{atom.body && atom.body.map((x, i) => <View key={i}>{x.render()}</View>)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  body: {flexDirection: 'row', alignItems: 'center'},
});
