import {Atom, AtomJson} from '../core/atom-class';
import type {GlobalContext} from '../core/context';
import {charToLatex} from '../core-definitions/definitions-utils';

export class TextAtom extends Atom {
  constructor(command: any, value: any, style: any, context: any) {
    super('text', context, {
      command,
      mode: 'text',
      displayContainsHighlight: true,
    });
    this.value = value;
    this.verbatimLatex = value;
  }

  static fromJson(json: AtomJson, context: GlobalContext): TextAtom {
    return new TextAtom(json.command, json.value, json.style, context);
  }

  toJson(): AtomJson {
    return super.toJson();
  }

  render(context: any): any {
    return context;
  }

  serialize(_options: any) {
    return this.verbatimLatex ?? charToLatex('text', this.value.codePointAt(0));
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
