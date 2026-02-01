import React, { createContext, useContext } from "react";
import { TypeTheme } from "./types";

const ThemeContext = createContext<TypeTheme | undefined>(undefined);

export const ThemeProvider: React.FC<{ theme: TypeTheme; children: React.ReactNode }> = ({
  theme,
  children,
}) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): TypeTheme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
