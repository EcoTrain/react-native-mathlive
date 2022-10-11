jest.doMock('expo-font', () => {
  const actualFonts = jest.requireActual('expo-font');
  return {
    ...actualFonts,
    useFonts: () => {
      const fontsLoaded = true;
      return [fontsLoaded];
    },
  };
});
