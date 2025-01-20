import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import React, {
  memo,
  useEffect,
  InputHTMLAttributes,
  ChangeEventHandler,
  CSSProperties,
  KeyboardEvent,
} from "react";
import styles from "./Input.module.scss";

type TypeInput<T = string> = TypeFlexElement & {
  value?: T;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  isFocused?: boolean;
  className?: string;
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const Input = <T extends string | number | readonly string[]>({
  value,
  type,
  placeholder,
  className,
  style,
  isFocused,
  onChange,
  onKeyDown,
  ...props
}: TypeInput<T>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const flexContainerProps: TypeFlexElement = {
    ...props,
    dimensionX: "fill",
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <FlexElement {...flexContainerProps} className={className}>
      <input
        ref={inputRef}
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter value"}
        className={`${styles.input} ${className}`}
        style={style}
        onKeyDown={onKeyDown}
      />
    </FlexElement>
  );
};

export default memo(Input) as <T = string>(props: TypeInput<T>) => React.ReactElement;
