export const loadTheme = () => {
    const theme = localStorage.getItem("theme");
    return theme ? JSON.parse(theme) : null;
}