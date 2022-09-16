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
    this.body = options.body ?? [];
  }

  render(context) {
    console.log({...this});
    return <SurdAtomRender context={context} body={this.body} />;
  }
}

const SurdAtomRender = ({context, body}) => {
  console.log('SurdAtomRender', {context, body});

  const getStruts = () => {
    return Array(body.length - 1)
      .fill(1)
      .map(() => <Text style={{borderRightWidth: 1}}> </Text>);
  };

  // TODO: make struts for sqrt

  return (
    <View style={styles.container}>
      <View>
        {/* {body.length > 1 && getStruts()} */}
        <Text style={styles.root}>√</Text>
      </View>
      <View style={styles.body}>
        {body.map((x, i) => (
          <View key={i}>{x.render(context)}</View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row'},
  body: {flexDirection: 'row', alignItems: 'center', borderTopWidth: 1},
  root: {fontFamily: 'KaTeX_Size3'},
});
