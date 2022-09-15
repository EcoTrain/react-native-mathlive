import {Text, TouchableOpacity, View} from 'react-native';
import {Atom} from '../core/atom';

/**
 * Genfrac -- Generalized Fraction
 *
 * Decompose fractions, binomials, and in general anything made
 * of a numerator and denominator, optionally separated by a fraction bar,
 * and optionally surrounded by delimiters (parentheses, brackets, etc...).
 *
 * Depending on the type of fraction the mathstyle is either
 * displaystyle or textstyle. This value can also be set to 'auto',
 * to indicate it should use the current mathstyle
 */
export class GenfracAtom extends Atom {
  hasBarLine;
  leftDelim;
  rightDelim;
  continuousFraction;
  numerPrefix;
  denomPrefix;
  mathstyleName;

  constructor(command, above, below, context, options) {
    super('genfrac', context, {
      style: options.style,
      command,
      serialize: options.serialize,
      displayContainsHighlight: true,
    });
    this.above = above;
    this.below = below;
    this.hasBarLine = options?.hasBarLine ?? true;
    this.continuousFraction = options?.continuousFraction ?? false;
    this.numerPrefix = options?.numerPrefix;
    this.denomPrefix = options?.denomPrefix;
    this.mathstyleName = options?.mathstyleName;
    this.leftDelim = options?.leftDelim;
    this.rightDelim = options?.rightDelim;
  }

  static fromJson(json, context) {
    return new GenfracAtom(json.command, json.above, json.below, context, json);
  }

  toJson() {
    const options = {};
    if (this.continuousFraction) options.continuousFraction = true;
    if (this.numerPrefix) options.numerPrefix = this.numerPrefix;
    if (this.denomPrefix) options.denomPrefix = this.denomPrefix;
    if (this.leftDelim) options.leftDelim = this.leftDelim;
    if (this.rightDelim) options.rightDelim = this.rightDelim;
    if (!this.hasBarLine) options.hasBarLine = false;
    if (this.mathstyleName) options.mathstyleName = this.mathstyleName;
    return {...super.toJson(), ...options};
  }

  serialize(options) {
    return this.command + `{${this.aboveToLatex(options)}}` + `{${this.belowToLatex(options)}}`;
  }

  // The order of the children, which is used for keyboard navigation order,
  // may be customized for fractions...
  get children() {
    if (this._children) return this._children;

    const result = [];
    if (this.context.fractionNavigationOrder === 'numerator-denominator') {
      for (const x of this.above) {
        result.push(...x.children);
        result.push(x);
      }
      for (const x of this.below) {
        result.push(...x.children);
        result.push(x);
      }
    } else {
      for (const x of this.below) {
        result.push(...x.children);
        result.push(x);
      }
      for (const x of this.above) {
        result.push(...x.children);
        result.push(x);
      }
    }

    this._children = result;
    return result;
  }

  render(context) {
    console.log({...this});
    return <GenfracAtomRender context={context} above={this.above} below={this.below} />;
  }
}

const GenfracAtomRender = ({context, above, below}) => {
  console.log('GenfracAtomRender', {context, above, below});
  return (
    <View style={{display: 'flex'}}>
      <Text>{above.map(x => x.render(context))}</Text>
      <View style={{borderBottomWidth: 1}}></View>
      <Text>{below.map(x => x.render(context))}</Text>
    </View>
  );
};
