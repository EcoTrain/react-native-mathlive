import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {FracAtom} from './FracAtom';
import {TextAtom} from './TextAtom';

const typeToAtom = {
  text: TextAtom,
  frac: FracAtom,
};

export const Atom = ({token, type}) => {
  const [isFocused, setFocused] = useState(false);

  const TypedAtom = typeToAtom[type] || typeToAtom.text;

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  console.log(token);

  return (
    <TouchableOpacity onPress={onFocus} onBlur={onBlur} style={{flexDirection: 'row'}}>
      <TypedAtom token={token} />
      {isFocused && <Text>|</Text>}
    </TouchableOpacity>
  );
};
