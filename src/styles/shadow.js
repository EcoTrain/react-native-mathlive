import {useContext} from 'react';
import {Platform} from 'react-native';
import {ThemeContext} from '../contexts/ThemeContext';

function makeShadow(depth, opacity = 0) {
  const {UiColors} = useContext(ThemeContext);
  function interpolate(i, a, b, a2, b2) {
    return ((i - a) * (b2 - a2)) / (b - a) + a2;
  }

  const shadowColor = (UiColors && UiColors.textCold) || '#000000';

  return {
    shadowColor: shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
      // height: Math.floor(depth * 0.05) || 1,
    },
    shadowOpacity: opacity || interpolate(depth, 1, 24, 0.2, 0.6),
    shadowRadius: interpolate(depth, 1, 40, 0, 16),
    elevation: Platform.select({
      android: depth * (opacity * 2 || 1),
      default: depth,
    }),
  };
}

export {makeShadow};
