import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Select, { TypeValue } from "components/molecules/select/Select";
import React, { FC, memo } from "react";

type TypeEnum = {
  selectClassName?: string;
  label: string;
  options: { label: string; value: string }[];
  onChange?: (value: TypeValue) => void;
} & TypeFlexElement;

const Enum: FC<TypeEnum> = ({
  selectClassName = "",
  label = "",
  options = [],
  onChange,
  ...props
}) => {
  return (
    <FlexElement {...props} dimensionX={"fill"} alignment={"leftCenter"}>
      <Select
        className={selectClassName}
        placeholder={label}
        options={options}
        onChange={onChange || (() => {})}
      />
    </FlexElement>
  );
};

export default memo(Enum);
