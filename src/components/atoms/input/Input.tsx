import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import {
  memo,
  InputHTMLAttributes,
  ChangeEventHandler,
  KeyboardEvent,
  FocusEventHandler,
  useState,
  FC,
  RefObject,
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
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const Input: FC<TypeInput<string | number | readonly string[]>> = ({
  value,
  type,
  placeholder,
  id,
  isFocused,
  disabled,
  debounceDelay,
  readonly,
  inputRef,
  onChange,
  onFocus,
  onKeyDown,
  ...props
}) => {
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
    { delay: debounceDelay }
  );
  return (
    <FlexElement {...flexContainerProps}>
      <input
        ref={inputRef}
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
};

export default memo(Input);
