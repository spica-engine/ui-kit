import { memo, useState, FC, RefObject, InputHTMLAttributes, useEffect } from "react";
import styles from "./Input.module.scss";
import { useDebounce } from "custom-hooks/useDebounce";
import { TypeFlexDimension } from "utils/interface";
import { useFlexStyles } from "custom-hooks/useFlexStyles";

export type TypeInput = {
  debounceDelay?: number;
  ref?: RefObject<HTMLInputElement | null>;
} & InputHTMLAttributes<HTMLInputElement> &
  TypeFlexDimension;

const Input: FC<TypeInput> = ({
  debounceDelay,
  dimensionX,
  dimensionY,
  ref,
  value,
  onChange,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedOnChange(e);
  };

  const debouncedOnChange = useDebounce(
    ((event: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.({
        ...event,
        target: {
          ...event.target,
          value: event.target.value,
        },
      })) as (...args: unknown[]) => unknown,
    { delay: debounceDelay }
  );

  const inputFlexStyles = useFlexStyles<TypeFlexDimension>({
    dimensionX: dimensionX ?? "hug",
    dimensionY: dimensionY ?? "hug",
  });

  return (
    <input
      ref={ref}
      value={localValue}
      onChange={handleChange}
      {...props}
      className={`${props.className} ${styles.input} ${inputFlexStyles}`}
    />
  );
};

export default memo(Input);
