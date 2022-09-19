import React from 'react';
import {View} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from '../core/atom';

/*
 * An atom representing a syntactic error, such as an unknown command
 */
export class ErrorAtom extends Atom {
  constructor(command, value, context) {
    super('error', context, {
      command,
    });
    this.value = value;
  }

  render() {
    return (
      <View>
        <Text>{'Undefined ' + this.command}</Text>
      </View>
    );
  }
}
