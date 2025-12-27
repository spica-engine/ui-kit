import Popover, { TypePopover } from "@atoms/popover/Popover";
import React, { FC, useMemo } from "react";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Text from "@atoms/text/Text";
import styles from "./Object.module.scss";
import ObjectInput from "../../normal/object/ObjectInput";
import { TypeProperties, TypeRepresenterValue } from "@custom-hooks/useInputRepresenter";

const createOrderedValue = (
  value: TypeRepresenterValue | undefined,
  properties: TypeProperties
): Record<string, any> => {
  const orderedKeys = Object.keys(properties);
  return Object.fromEntries(orderedKeys.map((key) => [key, (value as any)?.[key]]));
};

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
  const orderedValue = useMemo(() => createOrderedValue(value, properties), [value, properties]);

  const {
    contentProps: consumerContentProps,
    containerProps: consumerContainerProps,
    ...restPopoverProps
  } = popoverProps ?? {};

  return (
    <Popover
      contentProps={{
        className: styles.contentContainer,
        ...consumerContentProps,
      }}
      containerProps={{
        dimensionX: "fill",
        ...consumerContainerProps,
      }}
      {...restPopoverProps}
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
        <Text className={styles.value}>{JSON.stringify(orderedValue)}</Text>
      </FlexElement>
    </Popover>
  );
};

export default MinimizedObjectInput;
