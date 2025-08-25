import Popover from "@atoms/popover/Popover";
import React, { FC } from "react";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Text from "@atoms/text/Text";
import styles from "./Object.module.scss";
import ObjectInput from "../../normal/object/ObjectInput";
import { TypeProperties, TypeRepresenterValue } from "@custom-hooks/useInputRepresenter";

export type TypeMinimizedObjectInput = {
  value?: TypeRepresenterValue;
  properties: TypeProperties;
  popoverProps?: TypeFlexElement;
  contentProps?: TypeFlexElement;
  onChange?: (value: any) => void;
  portalClassName?: string;
} & TypeFlexElement;

const MinimizedObjectInput: FC<TypeMinimizedObjectInput> = ({
  value,
  popoverProps,
  contentProps,
  properties,
  onChange,
  portalClassName,
  ...props
}) => {
  return (
    <Popover
      portalClassName={portalClassName}
      content={
        <ObjectInput
          properties={properties}
          value={value}
          onChange={(value) => onChange?.(value)}
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

export default MinimizedObjectInput;
