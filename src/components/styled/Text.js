import React from 'react';
import {Text as CText} from 'react-native';
import {MF_DEFAULT_FONT_SIZE} from '../../styles/defaults';

export const Text = ({children, ...props}) => {
  return (
    <CText
      {...props}
      style={[
        {
          // fontSize: MF_DEFAULT_FONT_SIZE,
          // fontFamily: 'KaTeX_Size1_Regular',
        },
        props.style,
      ]}>
      {children}
    </CText>
  );
};
