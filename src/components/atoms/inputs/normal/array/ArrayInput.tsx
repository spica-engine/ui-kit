import { FC, memo, useCallback, useState } from "react";
import styles from "./ArrayInput.module.scss";
import Icon from "@atoms/icon/Icon";
import InputHeader from "@atoms/input-header/InputHeader";
import Text, { TypeText } from "@atoms/text/Text";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import InputGroup from "@atoms/base-input/InputGroup";
import useInputRepresenter, {
  TypeArrayItems,
  TypeInputType,
  TypeProperties,
  TypeRepresenterValue,
  TypeValueType,
} from "@custom-hooks/useInputRepresenter";
import DropList from "@atoms/drop-list/DropList";

export type TypeArrayInput = {
  value?: TypeValueType[];
  title?: string;
  description?: string;
  errorMessage?: string;
  helperTextContainerProps?: TypeFlexElement;
  helperTextProps?: TypeText;
  minItems?: number;
  maxItems?: number;
  propertyKey: string;
  items?: TypeArrayItems;
  onChange?: (value: any) => void;
} & TypeFlexElement;

const ArrayInput: FC<TypeArrayInput> = ({
  value,
  items,
  title,
  description,
  errorMessage,
  helperTextContainerProps,
  helperTextProps,
  maxItems,
  propertyKey,
  onChange,
  minItems,
  ...props
}) => {
  const [active, setActive] = useState(0);

  const handleChange = (_value: { [key: string]: TypeValueType[] }) => {
    const updatedValue = structuredClone(value);
    if (!updatedValue?.length) return value;
    updatedValue[active] = _value[propertyKey] as TypeValueType;
    onChange?.(updatedValue);
  };

  const inputFields = useInputRepresenter({
    properties: { [propertyKey]: items } as unknown as TypeProperties,
    value: { [propertyKey]: value?.[active] } as TypeRepresenterValue,
    onChange: handleChange,
  });

  const handleChangeActiveIndex = (index: number) => {
    setActive(index);
  };

  const generateDefaultValueForType = useCallback(
    (
      type: TypeInputType,
      properties?: TypeProperties,
      enumValues?: (string | number)[],
      defaultValue?: TypeValueType
    ): TypeValueType => {
      // If explicit default is provided, use it
      if (defaultValue !== undefined) {
        return defaultValue;
      }

      // If enum is provided, use the first value
      if (enumValues && enumValues.length > 0) {
        return enumValues[0];
      }

      // Generate default value based on type
      switch (type) {
        case "string":
        case "textarea":
        case "richtext":
        case "color":
        case "storage":
        case "select":
          return "";

        case "number":
          return 0;

        case "boolean":
          return false;

        case "date":
          return "";

        case "multiselect":
        case "chip":
          return [];

        case "location":
          return { lat: 0, lng: 0 };

        case "relation":
          return [];

        case "object":
          if (!properties) return {};

          // Generate default object based on properties
          const defaultObject: TypeRepresenterValue = {};
          Object.entries(properties).forEach(([key, property]) => {
            defaultObject[key] = generateDefaultValueForType(
              property.type,
              property.properties,
              property.enum,
              property.default
            );
          });
          return defaultObject;

        case "array":
          return [];

        default:
          return "";
      }
    },
    []
  );

  const getDefaultValue = useCallback((): TypeValueType => {
    if (!items) return "";
    return generateDefaultValueForType(items.type, items.properties, items.enum);
  }, [items, generateDefaultValueForType]);

  const handleCreateNewItem = () => {
    const localValue = value || [];

    localValue?.push(value?.[active] || getDefaultValue());
    onChange?.(localValue);
    setActive(localValue.length - 1);
  };

  const handleDeleteItem = (index: number) => {
    const localValue = value || [];
    localValue.splice(index, 1);
    onChange?.(localValue);
    setActive(Math.max(0, index - 1));
  };

  return (
    <FlexElement
      gap={20}
      direction="vertical"
      dimensionX="fill"
      {...props}
      className={`${props.className} ${styles.container}`}
    >
      <div className={styles.header}>
        {title && (
          <InputHeader
            prefix={{ children: <Icon name="ballot" className={styles.icon} /> }}
            root={{ children: <Text variant="secondary">{title}</Text> }}
          />
        )}
        <DropList
          length={value?.length}
          active={active}
          maxItems={maxItems}
          onChange={handleChangeActiveIndex}
          onCreate={handleCreateNewItem}
          onDelete={handleDeleteItem}
        />
      </div>
      {value?.length ? inputFields : "Create an element to see the fields"}
      <InputGroup.HelperText
        alignment="leftCenter"
        dimensionX="fill"
        {...helperTextContainerProps}
        className={`${styles.helperText} ${helperTextContainerProps?.className}`}
      >
        <Text
          {...helperTextProps}
          size="small"
          variant={errorMessage ? "danger" : "secondary"}
          className={`${helperTextProps?.className}`}
        >
          {errorMessage || description}
        </Text>
      </InputGroup.HelperText>
    </FlexElement>
  );
};

export default memo(ArrayInput);
