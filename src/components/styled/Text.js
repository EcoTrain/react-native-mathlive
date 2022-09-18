import React from 'react';
import {Text as CText} from 'react-native';
import {DEFAULT_FONT_SIZE} from '../../styles/defaults';

export const Text = ({children, ...props}) => {
  return (
    <CText
      {...props}
      style={[
        {
          fontSize: DEFAULT_FONT_SIZE,
          fontFamily: 'KaTeX_Size4-Regular',
        },
        props.style,
      ]}>
      {children}
    </CText>
  );
};
