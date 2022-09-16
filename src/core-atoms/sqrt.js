import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../components/styled/Text';
import {Atom} from './atom';

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
export class SqrtAtom extends Atom {
  mathstyleName;

  constructor(command, context, options) {
    super('surd', context, {
      command,
    });
    this.context = context;
    this.body = options.body ?? [];
  }

  render() {
    console.log({...this});
    return <SurdAtomRender context={this.context} body={this.body} />;
  }
}

const SurdAtomRender = ({context, body}) => {
  const [size, setSize] = useState({width: 0, height: 0});

  // TODO: make struts for sqrt

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={{display: 'flex'}}>
          {!context.placeOnKeyboard && size.height > 40 && <Text style={{borderRightWidth: 1}}> </Text>}
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={
              !context.placeOnKeyboard && {
                fontFamily: 'KaTeX_Size3',
                fontSize: Math.min(50, 0.9 * size.height),
              }
            }>
            √
          </Text>
        </View>
        <View
          style={styles.body}
          onLayout={e => {
            const {width, height} = e.nativeEvent.layout;
            setSize({width: width, height: height});
          }}>
          {body.map((x, i) => (
            <View key={i}>{x.render(context)}</View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row'},
  body: {flexDirection: 'row', alignItems: 'center', borderTopWidth: 1},
  root: {},
});
