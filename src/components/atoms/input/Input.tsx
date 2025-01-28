import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import React, {
  memo,
  InputHTMLAttributes,
  ChangeEventHandler,
  KeyboardEvent,
  FocusEventHandler,
  forwardRef,
} from "react";
import styles from "./Input.module.scss";

export type TypeInput<T = string> = TypeFlexElement & {
  value?: T;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  isFocused?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, TypeInput<string | number | readonly string[]>>(
  (
    {
      value,
      type,
      placeholder,
      id,
      isFocused,
      disabled,
      readonly,
      onChange,
      onFocus,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const flexContainerProps: TypeFlexElement = {
      ...props,
      dimensionX: "fill",
    };

    return (
      <FlexElement {...flexContainerProps}>
        <input
          ref={ref}
          type={type || "text"}
          value={value}
          disabled={disabled}
          readOnly={readonly}
          placeholder={placeholder || "Enter value"}
          className={styles.input}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          id={id}
        />
      </FlexElement>
    );
  }
);

export default memo(Input) as <T = string>(
  props: TypeInput<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;
