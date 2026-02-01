import React, { useRef, useState } from "react";
import FluidContainer, { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import Icon from "@atoms/icon/Icon";
import styles from "./TextArea.module.scss";
import { Button, useOnClickOutside } from "index.export";

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
  rows = 2,
  cols = 1,
  ...props
}: MinimizedTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.(false);
  };

  useOnClickOutside({
    targetElements: [containerRef],
    onClickOutside: () => {
      handleBlur();
    },
  });
  return (
    <FluidContainer
      ref={containerRef}
      mode="fill"
      dimensionX="fill"
      prefix={props.prefix}
      root={{
        children: (
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={handleFocus}
            rows={isFocused ? Math.max(focusedRows, rows) : rows}
            cols={cols}
          ></textarea>
        ),
        ...props.root,
      }}
      suffix={{
        children: (
          <Button variant="icon" color="transparent" onClick={onClear}>
            <Icon name="close" />
          </Button>
        ),
        ...props.suffix,
      }}
      className={`${styles.textArea} ${props.className}`}
    />
  );
};

export default MinimizedTextArea;
