import { FC, memo, useState } from "react";
import styles from "./ArrayInput.module.scss";
import Icon from "components/atoms/icon/Icon";
import InputHeader from "components/atoms/input-header/InputHeader";
import Text, { TypeText } from "components/atoms/text/Text";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import InputGroup from "components/atoms/base-input/InputGroup";
import useInputRepresenter, {
  TypeArrayItems,
  TypeProperties,
  TypeRepresenterValue,
  TypeValueType,
} from "custom-hooks/useInputRepresenter";
import DropList from "components/atoms/drop-list/DropList";

type TypeArrayInput = {
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
  ...props
}) => {
  const [active, setActive] = useState(0);

  const handleChange = (_value: any) => {
    const updatedValue = structuredClone(value);
    if (!updatedValue?.length) return value;
    updatedValue[active] = _value[propertyKey];
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

  const handleCreateNewItem = () => {
    const localValue = value || [];

    localValue?.push(value?.[active] || "");
    onChange?.(localValue);
    setActive(localValue.length - 1);
  };

  return (
    <FlexElement
      gap={20}
      direction="vertical"
      dimensionX="fill"
      {...props}
      className={`${props.className} ${styles.container}`}
    >
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
      />

      {inputFields}
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
