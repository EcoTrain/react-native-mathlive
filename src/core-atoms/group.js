import React from 'react';
import {View} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from '../core/atom';

export class GroupAtom extends Atom {
  constructor(args, context, options) {
    super('group', context, {
      command: options?.command,
      serialize: options?.serialize,
    });
    this.body = args;
    this.latexOpen = options?.latexOpen;
    this.latexClose = options?.latexClose;
  }

  serialize() {
    let result = this.bodyToLatex();

    if (typeof this.latexOpen === 'string') result = this.latexOpen + result + this.latexClose;

    return result;
  }

  render() {
    return (
      <View>
        <Text>{'GroupAtom'}</Text>
      </View>
    );
  }
}
