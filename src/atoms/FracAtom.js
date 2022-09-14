import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const FracAtom = ({token}) => {
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  const parse = () => {
    // \\frac{#0}{#0}
  };

  console.log({token});

  return (
    <TouchableOpacity onPress={onFocus} onBlur={onBlur} style={{flex: 1, flexDirection: 'row'}}>
      <Text>{token}</Text>
      {isFocused && <Text>|</Text>}
    </TouchableOpacity>
  );
};
