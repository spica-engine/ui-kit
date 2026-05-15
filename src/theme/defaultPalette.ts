import { TypePalette } from "./types";

// Light palette — aligned with Spica light theme tokens
const lightPalette: TypePalette = {
    primary:          "#1a2448",
    primaryLight:     "#253060",
    primaryDark:      "#111833",
    danger:           "#ef4444",
    dangerLight:      "#fca5a5",
    dangerDark:       "#dc2626",
    success:          "#10b981",
    successLight:     "#6ee7b7",
    successDark:      "#059669",
    soft:             "#eeeeee",
    softLight:        "#ffffff",
    softDark:         "#d8d8d8",
    background:       "#f0f0f0",
    menuBackground:   "#ffffff",
    zebra:            "#f7f7f7",
    border:           "#e4e4e4",
    boxShadow:        "rgba(0, 0, 0, 0.12)",
    fontPrimary:      "#111827",
    fontSecondary:    "#ffffff",
    inputBackground:  "#f7f7f7",
    inputPlaceholder: "#9ca3af",
    tonalOffset:      0.2
};

// Dark palette — aligned with Spica dark theme tokens
const darkPalette: TypePalette = {
    primary:          "#4f6ef7",
    primaryLight:     "#6b84ff",
    primaryDark:      "#3a56d4",
    danger:           "#f87171",
    dangerLight:      "#fca5a5",
    dangerDark:       "#ef4444",
    success:          "#34d399",
    successLight:     "#a7f3d0",
    successDark:      "#10b981",
    soft:             "#202735",
    softLight:        "#13181f",
    softDark:         "#2f3b52",
    background:       "#0d1017",
    menuBackground:   "#13181f",
    zebra:            "#191f28",
    border:           "#252e3e",
    boxShadow:        "rgba(0, 0, 0, 0.5)",
    fontPrimary:      "#e4e8f2",
    fontSecondary:    "#ffffff",
    inputBackground:  "#191f28",
    inputPlaceholder: "#4e5e7a",
    tonalOffset:      0.3
};

export const defaultPaletes = {
    "light": lightPalette,
    "dark": darkPalette
}