export namespace helperUtils {
  export const camelToKebab = (str: string) => {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  };

  export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

  export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
}
