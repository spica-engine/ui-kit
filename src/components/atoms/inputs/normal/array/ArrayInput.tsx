import { FC, memo, useState } from "react";
import styles from "./ArrayInput.module.scss";
import Icon from "components/atoms/icon/Icon";
import InputHeader from "components/atoms/input-header/InputHeader";
import Text from "components/atoms/text/Text";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import InputGroup from "components/atoms/base-input/InputGroup";
import useInputRepresenter from "custom-hooks/useInputRepresenter";
import DropList from "components/atoms/drop-list/DropList";

type TypeArrayInput = {
  value: any[];
  title: string;
  description: string;
  errorMessage?: string;
  helperTextContainerProps?: TypeFlexElement;
  helperTextProps?: TypeFlexElement;
  minItems?: number;
  maxItems?: number;
  items: any;
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
  onChange,
  ...props
}) => {
  const [active, setActive] = useState(0);
  const inputFields = useInputRepresenter({
    properties: { array: items },
    value: value[active],
    onChange,
  });

  const handleChangeActiveIndex = (index: number) => {
    setActive(index);
  };

  const handleCreateNewItem = () => {
    value.push("");
    onChange?.(value);
    setActive(value.length - 1);
  };

  return (
    <FlexElement
      gap={20}
      direction="vertical"
      dimensionX="fill"
      {...props}
      className={`${props.className} ${styles.container}`}
    >
      <InputHeader
        prefix={{ children: <Icon name="ballot" className={styles.icon} /> }}
        root={{ children: <Text variant="secondary">{title}</Text> }}
      />
      <DropList
        length={value.length}
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
