import { memo, useState, FC, RefObject, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import { useDebounce } from "custom-hooks/useDebounce";

export type TypeInput = {
  debounceDelay?: number;
  ref?: RefObject<HTMLInputElement | null>;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<TypeInput> = ({ debounceDelay, ref, value, onChange, ...props }) => {
  const [localValue, setLocalValue] = useState(value);

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

  return (
    <input
      ref={ref}
      value={localValue}
      onChange={handleChange}
      {...props}
      className={`${props.className} ${styles.input}`}
    />
  );
};

export default memo(Input);
