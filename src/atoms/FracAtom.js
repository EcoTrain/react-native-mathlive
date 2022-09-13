import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const FracAtom = ({above, below}) => {
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

  return (
    <TouchableOpacity onPress={onFocus} onBlur={onBlur} style={{flex: 1, flexDirection: 'row'}}>
      <Text>{token}</Text>
      {token == '1' && <TextAtom options={{token: 'test'}} />}
      {isFocused && <Text>|</Text>}
    </TouchableOpacity>
  );
};
