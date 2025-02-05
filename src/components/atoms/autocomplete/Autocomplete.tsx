import React, { ChangeEvent, FC, memo, useEffect, useRef, useState, useLayoutEffect } from "react";
import styles from "./Autocomplete.module.scss";
import { TypeFluidContainer } from "../fluid-container/FluidContainer";
import ListItem from "../list-item/ListItem";
import InputWithIcon from "../input-with-icon/InputWithIcon";
import FlexElement from "../flex-element/FlexElement";
import { useOnClickOutside } from "custom-hooks/useOnClickOutside";
import useAdaptivePosition from "custom-hooks/useAdaptivePosition";
import { TypeInput } from "../input/Input";

type TypeAutocomplete = {
  value?: string;
  className?: string;
  options: string[];
  placeholder?: string;
  placement?: "bottom" | "top";
  popupClassName?: string;
  inputProps?: TypeInput;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const Autocomplete: FC<TypeAutocomplete> = ({
  className,
  value = "",
  placement = "bottom",
  popupClassName = "",
  placeholder = "",
  options,
  inputProps,
  disabled,
  onChange,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside({
    refs: [menuRef, containerRef],
    onClickOutside: () => setShowMenu(false),
  });

  const { targetPosition, calculatePosition } = useAdaptivePosition({
    containerRef,
    targetRef: menuRef,
    initialPlacement: placement,
  });

  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  useEffect(() => {
    filterOptions(search);
  }, [search, options]);

  useLayoutEffect(() => {
    if (showMenu && containerRef.current && menuRef.current) {
      calculatePosition();
    }
  }, [showMenu, filteredOptions, calculatePosition]);

  const filterOptions = (query: string) => {
    setFilteredOptions(
      query
        ? options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))
        : options
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleItemSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setSearch(selectedValue);
    setShowMenu(false);
  };

  const toggleDropdown = () => {
    if (disabled) return;
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <InputWithIcon
        ref={containerRef}
        inputProps={{
          placeholder,
          value: search,
          onChange: handleInputChange,
          disabled,
          ...inputProps,
          className: `${inputProps?.className} ${styles.input}`,
        }}
        dimensionX="fill"
        onClick={toggleDropdown}
        {...props}
      />
      {showMenu && (
        <FlexElement
          ref={menuRef}
          style={{ ...targetPosition }}
          className={`${popupClassName} ${styles.menuItems}`}
          direction="vertical"
          alignment="leftTop"
          gap={0}
        >
          {filteredOptions.map((option) => (
            <ListItem
              dimensionX={containerRef.current?.offsetWidth}
              key={option}
              label={option}
              onClick={() => handleItemSelect(option)}
              active={option.toLowerCase() === search.toLowerCase()}
            />
          ))}
        </FlexElement>
      )}
    </>
  );
};

export default memo(Autocomplete);
