import React from 'react';
import {View} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from './atom';

export class GroupAtom extends Atom {
  constructor(command, value, context) {
    super('group', context, {
      command,
    });
    this.value = value;
  }

  render(parentContext) {
    console.log('Render GroupAtom', {parentContext, val: this.value, lat: this.verbatimLatex});
    return (
      <View>
        <Text>{'GroupAtom'}</Text>
      </View>
    );
  }
}
