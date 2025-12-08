import { FC, memo, useState } from "react";
import styles from "./ArrayInput.module.scss";
import Icon from "@atoms/icon/Icon";
import InputHeader from "@atoms/input-header/InputHeader";
import Text, { TypeText } from "@atoms/text/Text";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import InputGroup from "@atoms/base-input/InputGroup";
import {
  TypeArrayItems,
  TypeInputRepresenterError,
  TypeValueType,
} from "@custom-hooks/useInputRepresenter";
import { useArrayItemInput } from "@custom-hooks/useArrayItemInput";
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
  errors?: TypeInputRepresenterError | string;
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
  errors,
  minItems,
  ...props
}) => {
  const [active, setActive] = useState(0);

  const { inputFields, getDefaultValue: getDefaultValueFn } = useArrayItemInput({
    propertyKey,
    items,
    value,
    activeIndex: active,
    onChange,
    errors,
  });

  const handleChangeActiveIndex = (index: number) => {
    setActive(index);
  };

  const handleCreateNewItem = () => {
    const localValue = [...(value || [])];

    localValue?.push(value?.[active] || getDefaultValueFn());
    onChange?.(localValue);
    setActive(localValue.length - 1);
  };

  const handleDeleteItem = (index: number) => {
    const localValue = [...(value || [])];
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
            className={styles.inputHeader}
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
      {value?.length ? (
        inputFields
      ) : (
        <span className={styles.emptyStateText}>Create an element to see the fields</span>
      )}
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
