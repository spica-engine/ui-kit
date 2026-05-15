import { FC, memo, useMemo, useEffect } from "react";
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
import { useArrayItemInput, getDefaultValue } from "@custom-hooks/useArrayItemInput";

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

type TypeArrayItemRowProps = {
  index: number;
  propertyKey: string;
  items?: TypeArrayItems;
  value?: TypeValueType[];
  onChange?: (value: any) => void;
  onDelete: () => void;
  canDelete: boolean;
  errors?: TypeInputRepresenterError | string;
};

const ArrayItemRow: FC<TypeArrayItemRowProps> = ({
  index,
  propertyKey,
  items,
  value,
  onChange,
  onDelete,
  canDelete,
  errors,
}) => {
  const itemsWithClass = useMemo(
    () => (items ? ({ ...items, className: styles.itemInput } as unknown as TypeArrayItems) : items),
    [items]
  );

  const { inputFields } = useArrayItemInput({
    propertyKey,
    items: itemsWithClass,
    value,
    activeIndex: index,
    onChange,
    errors,
  });

  return (
    <div className={styles.item}>
      <span className={styles.itemIdx}>{index}</span>
      <div className={styles.itemContent}>{inputFields}</div>
      <button
        className={styles.itemRemove}
        onClick={onDelete}
        type="button"
        aria-label={`Remove item ${index}`}
        disabled={!canDelete}
        style={!canDelete ? { visibility: "hidden" } : undefined}
      >
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

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
  minItems = 1,
  ...props
}) => {
  const effectiveMin = Math.max(1, minItems ?? 1);
  const canAddMore = !maxItems || !value || value.length < maxItems;
  const canDelete = !value || value.length > effectiveMin;

  useEffect(() => {
    if (!value || value.length === 0) {
      onChange?.([getDefaultValue(items)]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateNewItem = () => {
    const localValue = [...(value || [])];
    localValue.push(getDefaultValue(items));
    onChange?.(localValue);
  };

  const handleDeleteItem = (index: number) => {
    if (!canDelete) return;
    const localValue = [...(value || [])];
    localValue.splice(index, 1);
    onChange?.(localValue);
  };

  return (
    <FlexElement
      gap={8}
      direction="vertical"
      dimensionX="fill"
      {...props}
      className={`${props.className ?? ""} ${styles.container}`}
    >
      {title && (
        <InputHeader
          className={styles.inputHeader}
          prefix={{ children: <Icon name="ballot" className={styles.icon} /> }}
          root={{ children: <Text variant="secondary">{title}</Text> }}
        />
      )}
      <div className={styles.wrap}>
        {value?.map((_, index) => (
          <ArrayItemRow
            key={index}
            index={index}
            propertyKey={propertyKey}
            items={items}
            value={value}
            onChange={onChange}
            onDelete={() => handleDeleteItem(index)}
            canDelete={canDelete}
            errors={errors}
          />
        ))}
        {canAddMore ? (
          <button className={styles.addBtn} onClick={handleCreateNewItem} type="button">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add item
          </button>
        ) : !value?.length ? (
          <span className={styles.emptyStateText}>No items can be added</span>
        ) : null}
      </div>
      <InputGroup.HelperText
        alignment="leftCenter"
        dimensionX="fill"
        {...helperTextContainerProps}
        className={`${styles.helperText} ${helperTextContainerProps?.className ?? ""}`}
      >
        <Text
          {...helperTextProps}
          size="small"
          variant={errorMessage ? "danger" : "secondary"}
          className={`${helperTextProps?.className ?? ""}`}
        >
          {errorMessage || description}
        </Text>
      </InputGroup.HelperText>
    </FlexElement>
  );
};

export default memo(ArrayInput);
