import React, { useRef, useState } from "react";
import InputGroup from "./InputGroup";
import { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./BaseInput.module.scss";
import Text from "../text/Text";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";

type TypeBaseInputProps = {
  errorMessage?: string;
  description?: string;
  className?: string;
  inputContainerProps?: TypeFlexElement;
  labelProps?: TypeFluidContainer & {
    focusedClassName?: string;
    dividerClassName?: string;
    divider?: boolean;
  };
  children: React.ReactElement<{
    ref?: React.RefObject<unknown>;
    onChange?: React.ChangeEventHandler<unknown>;
    value?: string | number | readonly string[] | undefined;
  }>;
  disabled?: boolean;
  readonly?: boolean;
  onFocusChange?: (isFocused: boolean) => void;
} & TypeFlexElement;

const BaseInput = ({
  errorMessage,
  description,
  labelProps,
  onFocusChange,
  disabled = false,
  readonly = false,
  inputContainerProps,
  children,
  ...props
}: TypeBaseInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside({
    refs: [containerRef],
    onClickOutside: () => setIsFocused(false),
  });

  const handleClick = () => {
    if (disabled || readonly) return;
    setIsFocused(true);
    onFocusChange?.(true);
  };

  return (
    <InputGroup
      {...props}
      onClick={handleClick}
      ref={containerRef}
      direction="vertical"
      className={`${disabled ? styles.disabled : ""} ${props.className}`}
      gap={2}
    >
      <FlexElement
        {...inputContainerProps}
        className={`${styles.baseInputContainer} ${inputContainerProps?.className}`}
        dimensionX="fill"
        gap={15}
      >
        <InputGroup.Label
          {...labelProps}
          prefix={{
            children: labelProps?.prefix?.children,
            ...labelProps?.prefix,
          }}
          root={{
            children: labelProps?.root?.children,
            ...labelProps?.root,
          }}
          isFocused={isFocused || !!children.props.value}
          className={
            isFocused || !!children.props.value
              ? labelProps?.focusedClassName || styles.focused
              : ""
          }
          dividerClassName={labelProps?.dividerClassName}
        />
        {children}
      </FlexElement>

      <InputGroup.HelperText alignment="leftCenter" dimensionX="fill" className={styles.helperText}>
        <Text size="small" variant={errorMessage ? "danger" : "secondary"}>
          {errorMessage || description}
        </Text>
      </InputGroup.HelperText>
    </InputGroup>
  );
};

export default BaseInput;
