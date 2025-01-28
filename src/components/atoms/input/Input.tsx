import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import React, {
  memo,
  InputHTMLAttributes,
  ChangeEventHandler,
  KeyboardEvent,
  FocusEventHandler,
  forwardRef,
  useState,
  useEffect,
} from "react";
import styles from "./Input.module.scss";
import { useDebounce } from "custom-hooks/useDebounce";

export type TypeInput<T = string> = TypeFlexElement & {
  value?: T;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  isFocused?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  id?: string;
  debounceDelay?: number;
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
      debounceDelay,
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
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalValue(value);
      debouncedOnChange(value);
    };

    const debouncedOnChange = useDebounce(
      (value: unknown) => onChange?.({ target: { value } } as React.ChangeEvent<HTMLInputElement>),
      { delay: debounceDelay || 0 }
    );
    return (
      <FlexElement {...flexContainerProps}>
        <input
          ref={ref}
          type={type || "text"}
          value={localValue}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readonly}
          className={styles.input}
          onChange={handleChange}
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
