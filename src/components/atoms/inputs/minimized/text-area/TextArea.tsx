import React, { memo, useRef, useState } from "react";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Icon from "@atoms/icon/Icon";
import styles from "./TextArea.module.scss";
import { Button } from "index.export";

type MinimizedTextAreaProps = {
  value?: string;
  onClear?: () => void;
  onChange?: (value: string) => void;
  onFocus?: (isFocused: boolean) => void;
  onBlur?: (isFocused: boolean) => void;
  focusedRows?: number;
  rows?: number;
  cols?: number;
} & TypeFluidContainer;

const MinimizedTextArea = ({
  value,
  onClear,
  onChange,
  focusedRows = 3,
  onFocus,
  onBlur,
  rows = 1,
  cols = 1,
  ...props
}: MinimizedTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.(false);
  };

  const handleClear = () => {
    onClear?.();
    textAreaRef.current?.focus();
  };

  return (
    <FluidContainer
      mode="fill"
      dimensionX="fill"
      root={{
        children: (
          <textarea
            ref={textAreaRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={isFocused ? focusedRows : rows}
            cols={cols}
          ></textarea>
        ),
      }}
      suffix={{
        children: (
          <Button
            color="transparent"
            onClick={handleClear}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            className={styles.closeIcon}
          >
            <Icon name="close" />
          </Button>
        ),
      }}
      {...props}
      className={`${styles.textArea} ${props.className}`}
    />
  );
};

export default memo(MinimizedTextArea);
