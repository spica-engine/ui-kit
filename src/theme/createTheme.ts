import { helperUtils } from "utils/helperUtils";
import { TypePaletteTonalOffset, TypePalette, TypeTheme, TypeBorderRadius, TypeSpacing } from "./types";
import { defaultPaletes } from "./defaultPalette";
import { utils } from "utils";

export let customTheme: Partial<TypeTheme> | null = null;

const DEFAULT_VALUES = {
    PALETTE: {
        PRIMARY: "#1c1c50",
        BACKGROUND: "#f5f5f5",
        MENU_BACKGROUND: "#ffffff",
        ZEBRA: "f6f6f9",
        SUCCESS: "#21f412",
        DANGER: "#f41212",
        SOFT: "#f5f5f5",
        BORDER: "#d4d0d0",
        BOX_SHADOW: "#0000000d",
        FONT_PRIMARY: "#525252",
        FONT_SECONDARY: "#525252",
        INPUT_BACKGROUND: "#fafafa",
        INPUT_PLACEHOLDER: "#9b9b9b",
        TONAL_OFFSET: 0.2,
    },
    BORDER_RADIUS: 5,
    PADDING: 10,
    GAP: 10,
    FONT_SIZE: 16,
    FONT_FAMILY: "Inter",
}

const setCSSVariables = (theme: TypeTheme) => {
    const root = document.documentElement;

    const setVariables = (themeObj: Record<string, any>, prefix: string) => {
        Object.entries(themeObj).forEach(([key, value]) => {
            const formattedKey = helperUtils.camelToKebab(key);
            root.style.setProperty(`--${prefix}-${formattedKey}`, value);
        });
    };

    setVariables(theme.palette, "color");
    setVariables(theme.borderRadius, "border-radius");
    setVariables(theme.padding, "padding");
    setVariables(theme.gap, "gap");

    root.style.setProperty("--font-size-base", `${theme.fontSize}px`);
    root.style.setProperty("--font-family-base", theme.fontFamily);
};

export const createTheme = (theme: Partial<TypeTheme>): TypeTheme => {
    customTheme = helperUtils.deepCopy(theme);

    const primaryColors = generateColorVariants(theme.palette?.primary || DEFAULT_VALUES.PALETTE.PRIMARY, theme.palette?.tonalOffset);

    const successColors = generateColorVariants(theme.palette?.success || DEFAULT_VALUES.PALETTE.SUCCESS, theme.palette?.tonalOffset);
    const dangerColors = generateColorVariants(theme.palette?.danger || DEFAULT_VALUES.PALETTE.DANGER, theme.palette?.tonalOffset);
    const softColors = generateColorVariants(theme.palette?.soft || DEFAULT_VALUES.PALETTE.SOFT, theme.palette?.tonalOffset);

    const baseBorderRadius = theme.borderRadius?.base ?? DEFAULT_VALUES.BORDER_RADIUS;
    const basePadding = theme.padding?.base ?? DEFAULT_VALUES.PADDING;
    const baseGap = theme.gap?.base ?? DEFAULT_VALUES.GAP;

    const mode = theme.palette?.mode;
    const defaultPalette = mode ? defaultPaletes[mode] : undefined;

    const getPaletteValue = (key: keyof TypePalette, fallback: string | number) => (theme.palette?.[key] || defaultPalette?.[key] || fallback) as string;
    const getBorderRadiusValue = (key: keyof TypeBorderRadius, ratio: number) => (theme.borderRadius?.[key] ?? baseBorderRadius * ratio);
    const getPaddingValue = (key: keyof TypeSpacing, ratio: number) => (theme.padding?.[key] ?? baseGap * ratio);
    const getGapValue = (key: keyof TypeSpacing, ratio: number) => (theme.gap?.[key] ?? basePadding * ratio);

    const finalTheme: TypeTheme = {
        palette: {
            primary: getPaletteValue("primary", primaryColors.base),

            primaryLight: getPaletteValue("primaryLight", primaryColors.light),
            primaryDark: getPaletteValue("primaryDark", primaryColors.dark),

            danger: getPaletteValue("danger", dangerColors.base),
            dangerLight: getPaletteValue("dangerLight", dangerColors.light),
            dangerDark: getPaletteValue("dangerDark", dangerColors.dark),

            success: getPaletteValue("success", successColors.base),
            successLight: getPaletteValue("successLight", successColors.light),
            successDark: getPaletteValue("successDark", successColors.dark),

            soft: getPaletteValue("soft", softColors.base),
            softLight: getPaletteValue("softLight", softColors.light),
            softDark: getPaletteValue("softDark", softColors.dark),

            background: getPaletteValue("background", DEFAULT_VALUES.PALETTE.BACKGROUND),
            menuBackground: getPaletteValue("menuBackground", DEFAULT_VALUES.PALETTE.MENU_BACKGROUND),
            zebra: getPaletteValue("zebra", DEFAULT_VALUES.PALETTE.ZEBRA),

            border: getPaletteValue("border", DEFAULT_VALUES.PALETTE.BORDER),
            boxShadow: getPaletteValue("boxShadow", DEFAULT_VALUES.PALETTE.BOX_SHADOW),

            fontPrimary: getPaletteValue("fontPrimary", DEFAULT_VALUES.PALETTE.FONT_PRIMARY),
            fontSecondary: getPaletteValue("fontSecondary", DEFAULT_VALUES.PALETTE.FONT_SECONDARY),

            inputBackground: getPaletteValue("inputBackground", DEFAULT_VALUES.PALETTE.INPUT_BACKGROUND),
            inputPlaceholder: getPaletteValue("inputPlaceholder", DEFAULT_VALUES.PALETTE.INPUT_PLACEHOLDER),

            tonalOffset: getPaletteValue("tonalOffset", DEFAULT_VALUES.PALETTE.TONAL_OFFSET) as unknown as TypePaletteTonalOffset,
        },
        borderRadius: {
            sm: getBorderRadiusValue("sm", 0.6),
            md: getBorderRadiusValue("md", 1),
            lg: getBorderRadiusValue("lg", 2),
        },
        padding: {
            xs: getPaddingValue("xs", 0.25),
            sm: getPaddingValue("sm", 0.5),
            md: getPaddingValue("md", 1),
            lg: getPaddingValue("lg", 1.5),
            xl: getPaddingValue("xl", 2),
        },
        gap: {
            xs: getGapValue("xs", 0.25),
            sm: getGapValue("sm", 0.5),
            md: getGapValue("md", 1),
            lg: getGapValue("lg", 1.5),
            xl: getGapValue("xl", 2),
        },
        fontSize: theme.fontSize || DEFAULT_VALUES.FONT_SIZE,
        fontFamily: theme.fontFamily || DEFAULT_VALUES.FONT_FAMILY,
    };

    setCSSVariables(finalTheme);

    return finalTheme;
};

const generateColorVariants = (color: string, tonalOffset: TypePaletteTonalOffset = 0.2) => {
    const { h, s, l } = utils.color.hexToHSL(color);
    const lightOffset = typeof tonalOffset === "number" ? tonalOffset : tonalOffset.light;
    const darkOffset = typeof tonalOffset === "number" ? tonalOffset : tonalOffset.dark;

    return {
        base: color,
        light: utils.color.hslToHex(h, s, Math.min(1, l + lightOffset)),
        dark: utils.color.hslToHex(h, s, Math.max(0, l - darkOffset)),
    };
};