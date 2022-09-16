import {TouchableOpacity, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from './atom';

export class TextAtom extends Atom {
  constructor(command, value, context) {
    super('text', context, {
      command,
    });
    this.value = value;
    this.verbatimLatex = value;
  }

  render() {
    return <TextAtomRender context={this.context} value={this.value} />;
  }
}

const TextAtomRender = ({context, value}) => {
  return (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgrey'}}>
        <Text style={context.placeOnKeyboard && {fontSize: 'inherit'}}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};
