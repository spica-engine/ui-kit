import React, { useRef, useState } from "react";
import InputGroup from "./InputGroup";

import { TypeFluidContainer } from "../fluid-container/FluidContainer";
import styles from "./BaseInput.module.scss";
import Text from "../text/Text";
import FlexElement from "../flex-element/FlexElement";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";

type TypeBaseInputProps = {
  errorMessage?: string;
  description?: string;
  className?: string;
  labelProps?: TypeFluidContainer & {
    focusedClassName?: string;
    dividerClassName?: string;
    divider?: boolean;
  };
  children: React.ReactElement<{
    ref?: React.RefObject<any>;
    onChange?: (event: React.ChangeEvent<any>) => void;
    value?: string | number | readonly string[] | undefined;
  }>;
};

const BaseInput = ({
  errorMessage,
  description,
  labelProps,
  children,
  ...props
}: TypeBaseInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);

  useOnClickOutside({
    refs: [containerRef],
    onClickOutside: () => setIsFocused(false),
  });

  const handleClick = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clonedChildren = React.cloneElement(children, {
    ref: inputRef,
  });

  return (
    <InputGroup onClick={handleClick} ref={containerRef} direction="vertical">
      <FlexElement className={`${styles.baseInputContainer} ${props.className}`}>
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
        {clonedChildren}
      </FlexElement>

      <InputGroup.HelperText className={styles.helperText} alignment="leftCenter" dimensionX="fill">
        <Text size="small" variant={errorMessage ? "danger" : "secondary"}>
          {errorMessage || description}
        </Text>
      </InputGroup.HelperText>
    </InputGroup>
  );
};

export default BaseInput;
