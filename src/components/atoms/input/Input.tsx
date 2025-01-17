import FlexElement, {
  FlexElementProps,
} from "components/atoms/flex-element/FlexElement";
import React, { memo, useEffect } from "react";
import styles from "./Input.module.scss";

type TypeInput = FlexElementProps & {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  isFocused?: boolean;
};

const Input: React.FC<TypeInput> = memo(({ inputProps, isFocused, ...props }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const flexContainerProps: FlexElementProps = {
    ...props,
    dimensionX: "fill",
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <FlexElement {...flexContainerProps} className={props.className}>
      <input
        ref={inputRef}
        type={inputProps?.type || "text"}
        {...inputProps}
        placeholder={inputProps?.placeholder}
        className={`${styles.input} ${inputProps?.className}`}
      />
    </FlexElement>
  );
});

export default Input;
