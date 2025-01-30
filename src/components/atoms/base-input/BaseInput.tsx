import React, { useEffect, useRef, useState } from "react";
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
  helperTextContainerProps?: TypeFlexElement;
  helperTextProps?: TypeFlexElement;
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
  forceFocus?: boolean;
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
  helperTextProps,
  helperTextContainerProps,
  children,
  forceFocus = false,
  ...props
}: TypeBaseInputProps) => {
  const [isFocused, setIsFocused] = useState(forceFocus);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsFocused(forceFocus);
  }, [forceFocus]);

  useOnClickOutside({
    refs: [containerRef],
    onClickOutside: () => {
      setIsFocused(false);
    },
  });

  const handleClick = () => {
    if (disabled || readonly) return;
    setIsFocused(true);
  };

  useEffect(() => {
    onFocusChange?.(isFocused);
  }, [isFocused]);

  return (
    <InputGroup
      onClick={handleClick}
      ref={containerRef}
      direction="vertical"
      gap={2}
      {...props}
      className={`${disabled ? styles.disabled : ""} ${props.className}`}
    >
      <FlexElement
        dimensionX="fill"
        gap={15}
        {...inputContainerProps}
        className={`${styles.baseInputContainer} ${inputContainerProps?.className}`}
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

      <InputGroup.HelperText
        alignment="leftCenter"
        dimensionX="fill"
        {...helperTextContainerProps}
        className={`${styles.helperText} ${helperTextContainerProps?.className}`}
      >
        <Text
          {...helperTextProps}
          size="small"
          variant={errorMessage ? "danger" : "secondary"}
          className={`${helperTextProps?.className}`}
        >
          {errorMessage || description}
        </Text>
      </InputGroup.HelperText>
    </InputGroup>
  );
};

export default BaseInput;
