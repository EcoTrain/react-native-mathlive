import React from 'react';
import {View} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from '../core/atom';

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
    return (
      <View>
        <Text>{'GroupAtom'}</Text>
      </View>
    );
  }
}
