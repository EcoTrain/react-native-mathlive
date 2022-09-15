import {View, Text, TouchableOpacity} from 'react-native';
import {Atom} from '../core/atom';

export class PlaceholderAtom extends Atom {
  constructor(context, options) {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const value = options?.value || context.placeholderSymbol;
    super('placeholder', context, {
      mode: options?.mode ?? 'math',
      value,
      command: '\\placeholder',
    });
    this.captureSelection = true;
    this.placeholderId = options?.placeholderId;
    this.defaultValue = options?.default;
  }

  render(context) {
    return <PlaceholderAtomRender />;
  }

  serialize(options) {
    let value = this.value ?? '';
    if (value === this.context.placeholderSymbol) value = '';
    const id = this.placeholderId ? `[${this.placeholderId}]` : '';
    const defaultValue = this.defaultValue ? `[${Atom.serialize(this.defaultValue, options)}]` : '';
    return `\\placeholder${id}${defaultValue}{${value}}`;
  }
}

const PlaceholderAtomRender = () => {
  return (
    <TouchableOpacity>
      <Text>▢</Text>
    </TouchableOpacity>
  );
};
