import {TouchableOpacity} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from './atom';

export class PlaceholderAtom extends Atom {
  constructor(context, options) {
    const value = options?.value || context.placeholderSymbol;
    super('placeholder', context, {
      value,
      command: '\\placeholder',
    });
    this.context = context;
    this.options = options;
  }

  render() {
    return <PlaceholderAtomRender value={this.value} context={this.context} />;
  }
}

const PlaceholderAtomRender = ({value, context}) => {
  return (
    <TouchableOpacity>
      <Text style={context.placeOnKeyboard && {fontSize: 'inherit'}}>{value}</Text>
    </TouchableOpacity>
  );
};
