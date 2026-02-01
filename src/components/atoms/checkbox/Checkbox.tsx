import React, {
  type ChangeEventHandler,
  type FC,
  memo,
  type ReactNode,
  useRef,
  useEffect,
  useId,
  type ChangeEvent,
} from "react";
import styles from "./Checkbox.module.scss";
import FluidContainer, { TypeFluidContainer } from "../fluid-container/FluidContainer";
import Text, { TypeText } from "../text/Text";

export type TypeCheckbox = {
  checked?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  indeterminate?: boolean;
  labelProps?: TypeText;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checkBoxClassName?: string;
  id?: string;
};

const Checkbox: FC<TypeCheckbox & TypeFluidContainer> = ({
  checked = false,
  disabled = false,
  label,
  indeterminate = false,
  labelProps,
  onChange,
  id,
  checkBoxClassName,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const generatedId = useId();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Workaround: Chrome doesn't repaint label when switching indeterminate -> checked; force repaint via style change
  useEffect(() => {
    if (!checked || indeterminate) return;
    const node = labelRef.current;
    if (!node) return;

    node.style.transform = "translateZ(0)";
    const raf = requestAnimationFrame(() => {
      node.style.transform = "";
    });

    return () => {
      cancelAnimationFrame(raf);
      if (node) node.style.transform = "";
    };
  }, [checked, indeterminate]);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onChange?.(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <FluidContainer
      {...props}
      onClick={handleContainerClick}
      dimensionY={36}
      className={`${props.className} ${styles.container} ${disabled && styles.disabled}`}
      prefix={{
        children: (
          <div
            className={`${styles.checkbox} ${indeterminate && styles.indeterminate} ${checkBoxClassName}`}
          >
            <input
              id={id ?? generatedId}
              ref={inputRef}
              type="checkbox"
              checked={checked}
              disabled={disabled}
              aria-checked={indeterminate ? "mixed" : checked}
              readOnly
            />
            <label
              ref={labelRef}
              htmlFor={id ?? generatedId}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ),
        ...props.prefix,
      }}
      root={{
        children: <Text {...labelProps}>{label}</Text>,
        ...props.root,
      }}
    />
  );
};

export default memo(Checkbox);
