import Input from "@atoms/input/Input";
import React, { FC, memo, useState } from "react";
import Chip from "@atoms/chip/Chip";
import styles from "./ChipInput.module.scss";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";

export type TypeChipInput = {
  label?: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
  value: string[];
  allowDuplicateValues?: boolean;
} & TypeFlexElement;

const ChipInput: FC<TypeChipInput> = ({
  label,
  placeholder = "Enter a value than press enter",
  onChange,
  value,
  allowDuplicateValues = false,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newValue = inputValue.trim();
      if (!allowDuplicateValues && value.includes(newValue)) return;
      const newChips = [...value, newValue];
      onChange(newChips);
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    const updatedChips = value.filter((_, i) => i !== index);
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
        <Chip variant="outlined" key={index} label={chip} onDelete={() => handleDelete(index)} />
      ))}
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </FlexElement>
  );
};

export default memo(ChipInput);
