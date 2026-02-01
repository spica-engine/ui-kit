import Popover, { TypePopover } from "@atoms/popover/Popover";
import React, { FC, useState } from "react";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import styles from "./Array.module.scss";
import {
  TypeArrayItems,
  TypeInputRepresenterError,
  TypeValueType,
} from "@custom-hooks/useInputRepresenter";
import { useArrayItemInput, getDefaultValue } from "@custom-hooks/useArrayItemInput";
import { Button, Icon } from "index.export";

export type TypeMinimizedArrayInput = {
  propertyKey: string;
  value?: TypeValueType[];
  items?: TypeArrayItems;
  popoverProps?: Omit<TypePopover, "content" | "children">;
  buttonsContainerProps?: TypeFlexElement;
  errors?: TypeInputRepresenterError | string;
  onChange?: (value: any) => void;
} & TypeFlexElement;

type TypeExistingItemContentProps = {
  propertyKey: string;
  items?: TypeArrayItems;
  value?: TypeValueType[];
  activeIndex: number;
  onChange?: (value: TypeValueType[]) => void;
  errors?: TypeInputRepresenterError;
};

const ExistingItemContent: FC<TypeExistingItemContentProps> = ({
  propertyKey,
  items,
  value,
  activeIndex,
  onChange,
  errors,
}) => {
  const { inputFields } = useArrayItemInput({
    propertyKey,
    items,
    value,
    activeIndex,
    onChange,
    errors,
  });

  return <div>{inputFields}</div>;
};

const MinimizedArrayInput: FC<TypeMinimizedArrayInput> = ({
  propertyKey,
  value,
  items,
  popoverProps,
  buttonsContainerProps,
  errors,
  onChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClickItem = (index: number) => {
    if (index >= 0) {
      setActiveIndex(index);
    } else {
      const currentValue = [...(value || [])];
      const newItem = getDefaultValue(items);
      currentValue.push(newItem);
      const newIndex = currentValue.length - 1;
      onChange?.(currentValue);
      setActiveIndex(newIndex);
    }
  };

  const handleChangeInternal = (newValue: TypeValueType[]) => {
    onChange?.(newValue);
  };

  const handleRemoveItem = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const currentValue = [...(value || [])];
    currentValue.splice(index, 1);
    onChange?.(currentValue);
    if (activeIndex === index) {
      setActiveIndex(null);
    } else if (activeIndex !== null && activeIndex > index) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const {
    contentProps: consumerContentProps,
    containerProps: consumerContainerProps,
    ...restPopoverProps
  } = popoverProps ?? {};

  const mergedContentClassName = [styles.contentContainer, consumerContentProps?.className]
    .filter(Boolean)
    .join(" ");

  const mergedContainerClassName = [styles.container, consumerContainerProps?.className]
    .filter(Boolean)
    .join(" ");

  const mergedButtonsClassName = [styles.buttonsContainer, buttonsContainerProps?.className]
    .filter(Boolean)
    .join(" ");

  return (
    <Popover
      contentProps={{
        ...consumerContentProps,
        className: mergedContentClassName,
      }}
      containerProps={{
        dimensionX: "hug",
        ...consumerContainerProps,
        className: mergedContainerClassName,
      }}
      {...restPopoverProps}
      open={activeIndex !== null}
      onClose={() => setActiveIndex(null)}
      content={
        activeIndex === null ? null : (
          <ExistingItemContent
            propertyKey={propertyKey}
            items={items}
            value={value}
            activeIndex={activeIndex}
            onChange={handleChangeInternal}
            errors={errors as TypeInputRepresenterError}
          />
        )
      }
    >
      <FlexElement
        {...buttonsContainerProps}
        className={mergedButtonsClassName}
        onClick={(e) => e.stopPropagation()}
      >
        {value?.map((item, index) => (
          <div key={JSON.stringify(item) + index} className={styles.itemButtonWrapper}>
            <Button
              variant="filled"
              className={styles.itemButton}
              onClick={() => handleClickItem(index)}
            >
              {index + 1}
            </Button>
            <Button
              variant="filled"
              shape="circle"
              className={styles.removeButton}
              onClick={(e) => handleRemoveItem(index, e)}
            >
              <Icon name="close" size="xs" />
            </Button>
          </div>
        ))}
        <Button variant="filled" className={styles.itemButton} onClick={() => handleClickItem(-1)}>
          +
        </Button>
      </FlexElement>
    </Popover>
  );
};

export default MinimizedArrayInput;
