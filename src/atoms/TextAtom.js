import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const TextAtom = ({token}) => {
  const [isFocused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  return (
    <TouchableOpacity onPress={onFocus} onBlur={onBlur} style={{flexDirection: 'row'}}>
      <Text>{token}</Text>
      {token == '1' && <TextAtom token={'test'} />}
      {isFocused && <Text>|</Text>}
    </TouchableOpacity>
  );
};
