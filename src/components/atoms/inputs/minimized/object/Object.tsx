import Popover, { TypePopover } from "@atoms/popover/Popover";
import React, { FC } from "react";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Text from "@atoms/text/Text";
import styles from "./Object.module.scss";
import ObjectInput from "../../normal/object/ObjectInput";
import { TypeProperties, TypeRepresenterValue } from "@custom-hooks/useInputRepresenter";

export type TypeMinimizedObjectInput = {
  value?: TypeRepresenterValue;
  properties: TypeProperties;
  popoverProps?: Omit<TypePopover, "content" | "children">;
  objectInputProps?: TypeFlexElement;
  onChange?: (value: any) => void;
} & TypeFlexElement;

const MinimizedObjectInput: FC<TypeMinimizedObjectInput> = ({
  value,
  popoverProps,
  objectInputProps,
  properties,
  onChange,
  ...props
}) => {
  return (
    <Popover
      contentProps={{
        className: styles.contentContainer,
        ...popoverProps?.contentProps,
      }}
      containerProps={{
        dimensionX: "fill",
        ...popoverProps?.containerProps,
      }}
      {...popoverProps}
      content={
        <ObjectInput
          properties={properties}
          value={value}
          onChange={(value) => onChange?.(value)}
          {...objectInputProps}
        />
      }
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

export default MinimizedObjectInput;
