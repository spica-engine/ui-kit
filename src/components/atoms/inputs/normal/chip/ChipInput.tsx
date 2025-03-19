import Input from "@atoms/input/Input";
import React, { FC, memo, useState } from "react";
import Chip from "@atoms/chip/Chip";
import styles from "./ChipInput.module.scss";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";

type TypeChipInput = {
  label?: string[];
  placeholder?: string;
  onChange?: (value: string[]) => void;
} & TypeFlexElement;

const ChipInput: FC<TypeChipInput> = ({
  label,
  placeholder = "Enter a value than press enter",
  onChange,
  ...props
}) => {
  const [chips, setChips] = useState<string[]>(label || []);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (onChange) {
      onChange(chips);
    }
  }, [chips, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newChips = [...chips, inputValue.trim()];
      setChips(newChips);
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    const updatedChips = chips.filter((_, i) => i !== index);
    setChips(updatedChips);
  };

  return (
    <FlexElement
      dimensionX={"fill"}
      direction="wrap"
      alignment="leftCenter"
      {...props}
      className={`${styles.chipInputContainer} ${props.className}`}
    >
      {chips.map((chip, index) => (
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
