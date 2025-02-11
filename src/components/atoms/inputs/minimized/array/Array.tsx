import Popover from "components/atoms/popover/Popover";
import React, { FC } from "react";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Text from "components/atoms/text/Text";
import styles from "./Array.module.scss";
import ArrayInput from "../../normal/array/ArrayInput";
import { TypeArrayItems, TypeValueType } from "custom-hooks/useInputRepresenter";

type TypeMinimizedArrayInput = {
  propertyKey: string;
  value?: TypeValueType[];
  items?: TypeArrayItems;
  popoverProps?: TypeFlexElement;
  contentProps?: TypeFlexElement;
} & TypeFlexElement;

const MinimizedArrayInput: FC<TypeMinimizedArrayInput> = ({
  propertyKey,
  value,
  items,
  popoverProps,
  contentProps,
  ...props
}) => {
  return (
    <Popover
      content={
        <ArrayInput
          propertyKey={propertyKey}
          items={items}
          value={value}
          //@ts-ignore
          onChange={(value) => props.onChange?.({ key: props.key, value })}
          {...contentProps}
        />
      }
      contentProps={{ className: styles.contentContainer }}
      containerProps={{ dimensionX: "fill" }}
      {...popoverProps}
    >
      <FlexElement
        dimensionX="fill"
        alignment="leftCenter"
        dimensionY={36}
        {...props}
        className={`${props.className} ${styles.inputMinimized}`}
      >
        <Text className={styles.value}>{JSON.stringify(value)}</Text>
      </FlexElement>
    </Popover>
  );
};

export default MinimizedArrayInput;
