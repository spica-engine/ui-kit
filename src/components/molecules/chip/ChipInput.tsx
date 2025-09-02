import Input from "@atoms/input/Input";
import React, { FC, memo, useEffect, useState } from "react";
import Chip from "@atoms/chip/Chip";
import styles from "./ChipInput.module.scss";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Text from "@atoms/text/Text";

export type TypeChipInput = {
  label?: string[];
  placeholder?: string;
  onChange: (value: string[] | number[]) => void;
  value: string[] | number[];
  allowDuplicateValues?: boolean;
  valueType?: "string" | "number";
} & TypeFlexElement;

const ChipInput: FC<TypeChipInput> = ({
  label,
  placeholder = "Enter a value than press enter",
  onChange,
  value,
  allowDuplicateValues = false,
  valueType = "string",
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | undefined>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newValue = valueType === "number" ? Number(inputValue.trim()) : inputValue.trim();
      if (typeof newValue === "number" && isNaN(newValue)) {
        setError("Value must be a valid number");
        return;
      }
      if (!allowDuplicateValues && value.includes(newValue as never)) return;
      const newChips = [...value, newValue] as string[] | number[];
      onChange(newChips);
      setInputValue("");
    }
  };

  useEffect(() => {
    setError(undefined);
  }, [inputValue]);

  useEffect(() => {
    let newChips = [];
    if (valueType === "number") {
      newChips = value.filter((i) => !isNaN(Number(i))).map((i) => Number(i));
    } else {
      newChips = value.map((i) => String(i));
      setError(undefined);
    }
    onChange(newChips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueType]);

  const handleDelete = (index: number) => {
    const updatedChips = value.filter((_, i) => i !== index) as string[] | number[];
    onChange(updatedChips);
  };

  return (
    <FlexElement
      dimensionX={"fill"}
      direction="wrap"
      alignment="leftCenter"
      {...props}
      className={`${styles.chipInputContainer} ${props.className}`}
    >
      {value.map((chip, index) => (
        <Chip
          variant="outlined"
          key={index}
          label={String(chip)}
          onDelete={() => handleDelete(index)}
        />
      ))}
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.errorTextContainer}>
        {error && (
          <Text className={styles.errorText} variant="danger">
            {error}
          </Text>
        )}
      </div>{" "}
    </FlexElement>
  );
};

export default memo(ChipInput);
