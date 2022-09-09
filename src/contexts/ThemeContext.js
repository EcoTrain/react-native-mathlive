import React, {useState, useEffect} from 'react';

const defaultColors = {
  mathfieldBg: 'hsl(204, 20%, 98%)',
  keyboardBg: 'hsla(204,20%, 90%, 0.95)',
  kbKeyBg: 'hsl(204, 20%, 100%)',
  kbKeyActiveBg: 'hsl(204, 20%, 95%)',
  text: 'hsl(0, 0%, 0%)',
  textCold: 'hsl(0, 0%, 50%)',
  textSelected: 'hsl(204, 50%, 50%)',
};
export const ThemeContext = React.createContext({
  UiColors: defaultColors,
});

export const ThemeContextProvider = ({children}) => {
  const [colors, setColors] = useState(defaultColors);
  const defaultTheme = {
    UiColors: colors,
    setColors: setColors,
  };

  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};
