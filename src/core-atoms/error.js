import {View} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from './atom';

export class ErrorAtom extends Atom {
  constructor(command, value, style, context) {
    super('error', context, {
      command,
    });
    this.value = value;
    this.verbatimLatex = value;
  }

  render() {
    return (
      <View>
        <Text>{'Undefined ' + this.command}</Text>
      </View>
    );
  }
}