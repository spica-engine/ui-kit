import { FC, memo, useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import FluidContainer, {
  TypeFluidContainer,
} from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import SelectOption, { TypeLabeledValue } from "components/atoms/select-option/SelectOption";

type TypeValue = string | number | (string | number)[];

type TypeSelect = {
  value?: TypeValue;
  options: (string | number | TypeLabeledValue)[];
  placeholder?: string;
  position?: "top" | "bottom";
  multiple?: boolean;
  maxCount?: number;
  disabled?: boolean;
  popupClassName?: string;
  optionProps?: TypeFluidContainer;
  onChange: (value: TypeValue) => void;
};

const Select: FC<TypeSelect & TypeFluidContainer> = ({
  value,
  options,
  placeholder = "Select an option",
  position = "bottom",
  multiple = false,
  disabled = false,
  maxCount,
  popupClassName = "",
  optionProps,
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TypeValue | null>(
    value || (multiple ? [] : null)
  );
  const [dropdownPosition, setDropdownPosition] = useState<{
    top?: number;
    left?: number;
    right?: number;
  }>({});

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionSelect = (option: string | number) => {
    const updateMultipleSelection = () => {
      if (!Array.isArray(selectedOption)) return;
      const updatedOptions = selectedOption.includes(option)
        ? selectedOption.filter((el) => el !== option)
        : [...selectedOption, option];
      setSelectedOption(updatedOptions);
      onChange(updatedOptions as unknown as string | number);
    };

    const updateSingleSelection = () => {
      setSelectedOption(option);
      onChange(option);
      setIsOpen(false);
    };

    multiple ? updateMultipleSelection() : updateSingleSelection();
  };

  const calculatePosition = () => {
    if (!containerRef.current || !dropdownRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const calculatePositions = () => ({
      bottom: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: viewportWidth - rect.right - window.scrollX,
      },
      top: {
        top: rect.top - dropdownHeight + window.scrollY,
        left: rect.left + window.scrollX,
        right: viewportWidth - rect.right - window.scrollX,
      },
    });

    const positions = calculatePositions();

    const shouldSwitchToTop =
      position === "bottom" &&
      rect.bottom + dropdownHeight > viewportHeight &&
      rect.top - dropdownHeight >= 0;

    const shouldSwitchToBottom =
      position === "top" &&
      rect.top - dropdownHeight < 0 &&
      rect.bottom + dropdownHeight <= viewportHeight;

    if (shouldSwitchToTop) {
      setDropdownPosition(positions.top);
    } else if (shouldSwitchToBottom) {
      setDropdownPosition(positions.bottom);
    } else {
      setDropdownPosition(positions[position]);
    }
  };

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    if (!isOpen) calculatePosition();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dropdownRef?.current?.contains?.(event.target as Node) &&
        !containerRef?.current?.contains?.(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDisplayer = (): string => {
    if (!selectedOption) return placeholder;

    if (!multiple) {
      return handleSingleSelection(selectedOption as string | number);
    }

    return handleMultipleSelection(selectedOption);
  };

  const handleSingleSelection = (option: string | number): string => {
    if (typeof option !== "object") return String(option);
    return getLabelByValue(option) as string;
  };

  const handleMultipleSelection = (options: unknown): string => {
    if (!Array.isArray(options) || options.length === 0) return placeholder;

    if (typeof options[0] !== "object") {
      return options.join(", ");
    }

    return options.map((option) => getLabelByValue(option)).join(", ");
  };

  const getLabelByValue = (value: string | number): string | undefined => {
    return (options as TypeLabeledValue[]).find((el) => el.value === value)?.label;
  };

  return (
    <>
      <FluidContainer
        ref={containerRef}
        onClick={toggleDropdown}
        dimensionX="fill"
        dimensionY={36}
        className={`${props.className} ${styles.container} ${disabled && styles.disabled}`}
        root={{
          children: <Text>{getDisplayer()}</Text>,
          dimensionX: "fill",
          alignment: "leftCenter",
        }}
        suffix={{
          children: <Icon name="chevronDown" />,
        }}
        {...props}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            ...dropdownPosition,
            width: containerRef.current?.offsetWidth || "100%",
          }}
          className={`${popupClassName} ${styles.selectDropdown}`}
        >
          {options.map((option) => {
            const optionValue = typeof option === "object" ? option.value : option;
            const selected = multiple
              ? Array.isArray(selectedOption) && selectedOption.includes(optionValue)
              : selectedOption === optionValue;

            const isDisabled =
              multiple &&
              !!maxCount &&
              Array.isArray(selectedOption) &&
              selectedOption.length >= maxCount &&
              !selected;

            return (
              <SelectOption
                disabled={isDisabled}
                key={optionValue.toString()}
                multiple={multiple}
                option={option}
                selected={selected}
                onSelect={handleOptionSelect}
                {...optionProps}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default memo(Select);
