import {StyleSheet, Text as CText} from 'react-native';

export const Text = ({children, ...props}) => {
  console.log({...props});
  return (
    <CText {...props} style={[styles.base, props.style]}>
      {children}
    </CText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 24,
    fontFamily: 'KaTeX_Size4-Regular',
  },
});
