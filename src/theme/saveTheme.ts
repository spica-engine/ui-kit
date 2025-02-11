import { customTheme } from "./createTheme";

export const saveTheme = () => {
    localStorage.setItem("theme", JSON.stringify(customTheme));
}