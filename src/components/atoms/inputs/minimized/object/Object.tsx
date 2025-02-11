import Popover from "components/atoms/popover/Popover";
import React, { FC } from "react";
import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Text from "components/atoms/text/Text";
import styles from "./Object.module.scss";
import ObjectInput from "../../normal/object/ObjectInput";
import { TypeProperties, TypeRepresenterValue } from "custom-hooks/useInputRepresenter";

type TypeMinimizedObjectInput = {
  value?: TypeRepresenterValue;
  properties: TypeProperties;
  popoverProps?: TypeFlexElement;
  contentProps?: TypeFlexElement;
} & TypeFlexElement;

const MinimizedObjectInput: FC<TypeMinimizedObjectInput> = ({
  value,
  popoverProps,
  contentProps,
  properties,
  ...props
}) => {
  return (
    <Popover
      content={
        <ObjectInput
          properties={properties}
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

export default MinimizedObjectInput;
