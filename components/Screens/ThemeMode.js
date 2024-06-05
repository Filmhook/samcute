import React, { createContext, useContext } from 'react';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  return (
    <ThemeContext.Provider value={colorScheme}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

export default ThemeProvider