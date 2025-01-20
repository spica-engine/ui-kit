import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import React, {
  memo,
  InputHTMLAttributes,
  ChangeEventHandler,
  KeyboardEvent,
  forwardRef,
} from "react";
import styles from "./Input.module.scss";

type TypeInput<T = string> = TypeFlexElement & {
  value?: T;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  isFocused?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, TypeInput<string | number | readonly string[]>>(
  ({ value, type, placeholder, isFocused, onChange, onKeyDown, ...props }, ref) => {
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
          placeholder={placeholder || "Enter value"}
          className={styles.input}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </FlexElement>
    );
  }
);

export default memo(Input) as <T = string>(
  props: TypeInput<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;
