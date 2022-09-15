import {Atom} from '../core/atom';

export class TextAtom extends Atom {
  constructor(command, value, style, context) {
    super('text', context, {
      command,
      mode: 'text',
      displayContainsHighlight: true,
    });
    this.value = value;
    this.verbatimLatex = value;
  }

  render(context) {
    return context;
  }
}

// const TextAtomRender = ({context}) => {
//   return (
//     <TouchableOpacity onPress={onFocus} onBlur={onBlur} style={{flexDirection: 'row'}}>
//       <Text>{token}</Text>
//       {/* {token == '1' && <TextAtom token={'test'} />} */}
//       {isFocused && <Text>|</Text>}
//     </TouchableOpacity>
//   );
// };
