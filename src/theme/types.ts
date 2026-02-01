export type TypePaletteTonalOffset = number | {
    light: number;
    dark: number
};

export type TypePalette = {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    danger: string;
    dangerLight: string;
    dangerDark: string;
    success: string;
    successLight: string;
    successDark: string;
    soft: string;
    softLight: string;
    softDark: string;
    background: string;
    menuBackground: string;
    zebra: string;
    border: string;
    boxShadow: string;
    fontPrimary: string;
    fontSecondary: string;
    inputBackground: string;
    inputPlaceholder: string;
    tonalOffset: TypePaletteTonalOffset;
    mode?: 'dark' | 'light';
};

export type TypeSpacing = {
    base: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};

export type TypeBorderRadius = {
    base: number;
    sm: number;
    md: number;
    lg: number;
};

export type TypeTheme = {
    palette: Partial<TypePalette>;
    padding: Partial<TypeSpacing>;
    gap: Partial<TypeSpacing>;
    borderRadius: Partial<TypeBorderRadius>;
    fontSize: Partial<number>;
    fontFamily: Partial<string>;
}