import { useCallback, useMemo } from "react";
import useInputRepresenter, {
  TypeArrayItems,
  TypeInputRepresenterError,
  TypeInputType,
  TypeProperties,
  TypeRepresenterValue,
  TypeValueType,
} from "./useInputRepresenter";

export const generateDefaultValueForType = (
  type: TypeInputType,
  properties?: TypeProperties
): TypeValueType => {
  switch (type) {
    case "string":
    case "textarea":
    case "richtext":
    case "color":
    case "storage":
    case "select":
      return "";

    case "multiselect":
    case "chip":
    case "relation":
    case "array":
      return [];

    case "number":
      return 0;

    case "boolean":
      return false;

    case "location":
      return { lat: 0, lng: 0 };

    case "object": {
      if (!properties) return {};

      // Generate default object based on properties
      const defaultObject: TypeRepresenterValue = {};
      Object.entries(properties).forEach(([key, property]) => {
        defaultObject[key] =
          property.default ?? generateDefaultValueForType(property.type, property.properties);
      });
      return defaultObject;
    }

    case "date":
    default:
      return "";
  }
};

export const getDefaultValue = (items?: TypeArrayItems): TypeValueType => {
  if (!items) return "";
  return generateDefaultValueForType(items.type, items.properties);
};

type TypeUseArrayItemInput = {
  propertyKey: string;
  items?: TypeArrayItems;
  value?: TypeValueType[];
  activeIndex: number | null;
  onChange?: (value: TypeValueType[]) => void;
  errors?: TypeInputRepresenterError | string;
};

export const useArrayItemInput = ({
  propertyKey,
  items,
  value,
  activeIndex,
  onChange,
  errors,
}: TypeUseArrayItemInput) => {
  const handleChange = useCallback(
    (_value: { [key: string]: TypeValueType }) => {
      if (activeIndex === null) {
        const newValue = _value[propertyKey];
        const currentValue = [...(value || [])];
        currentValue.push(newValue);
        onChange?.(currentValue);
      } else {
        const updatedValue = [...(value || [])];
        if (activeIndex >= 0 && activeIndex < updatedValue.length) {
          updatedValue[activeIndex] = _value[propertyKey];
          onChange?.(updatedValue);
        }
      }
    },
    [propertyKey, value, activeIndex, onChange]
  );

  const currentValue = useMemo(() => {
    if (activeIndex !== null && activeIndex >= 0) {
      return value?.[activeIndex];
    }
    return getDefaultValue(items);
  }, [activeIndex, value, items]);

  const inputFields = useInputRepresenter({
    properties: { [propertyKey]: items } as unknown as TypeProperties,
    value: { [propertyKey]: currentValue } as TypeRepresenterValue,
    onChange: handleChange,
    error: errors as TypeInputRepresenterError,
  });

  return {
    inputFields,
    getDefaultValue: useCallback(() => getDefaultValue(items), [items]),
  };
};
