import {Text, TouchableOpacity, View} from 'react-native';
import {Atom} from './Atom';
import {useState} from 'react';

export class TextAtom extends Atom {
  constructor(command, value) {
    super('text', {
      command,
      mode: 'text',
      displayContainsHighlight: true,
    });
    this.value = value;
    this.verbatimLatex = value;
  }

  render() {
    return <TextAtomRender value={this.value} />;
  }
}

const TextAtomRender = ({value}) => {
  const [focused, setFocused] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{backgroundColor: focused && 'red'}}>
      <Text>{value}</Text>
    </TouchableOpacity>
  );
};
