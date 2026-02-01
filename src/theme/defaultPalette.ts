import { TypePalette } from "./types";

// !TODO Should be reset value
const lightPalette: TypePalette = {
    primary: "#1976d2",
    primaryLight: "#63a4ff",
    primaryDark: "#004ba0",
    danger: "#d32f2f",
    dangerLight: "#ff6659",
    dangerDark: "#9a0007",
    success: "#388e3c",
    successLight: "#6abf69",
    successDark: "#00600f",
    soft: "#f5f5f5",
    softLight: "#ffffff",
    softDark: "#c2c2c2",
    background: "#ffffff",
    menuBackground: "#f0f0f0",
    zebra: "#f9f9f9",
    border: "#e0e0e0",
    boxShadow: "rgba(0, 0, 0, 0.1)",
    fontPrimary: "#212121",
    fontSecondary: "#757575",
    inputBackground: "#ffffff",
    inputPlaceholder: "#9e9e9e",
    tonalOffset: 0.2
};

// !TODO Should be reset value
const darkPalette: TypePalette = {
    primary: "#90caf9",
    primaryLight: "#e3f2fd",
    primaryDark: "#42a5f5",
    danger: "#ef5350",
    dangerLight: "#ff867c",
    dangerDark: "#b61827",
    success: "#66bb6a",
    successLight: "#98ee99",
    successDark: "#338a3e",
    soft: "#121212",
    softLight: "#1e1e1e",
    softDark: "#000000",
    background: "#121212",
    menuBackground: "#1e1e1e",
    zebra: "#181818",
    border: "#333333",
    boxShadow: "rgba(0, 0, 0, 0.5)",
    fontPrimary: "#ffffff",
    fontSecondary: "#bdbdbd",
    inputBackground: "#333333",
    inputPlaceholder: "#757575",
    tonalOffset: 0.3
};

export const defaultPaletes = {
    "light": lightPalette,
    "dark": darkPalette
}