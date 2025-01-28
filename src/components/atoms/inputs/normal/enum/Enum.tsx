import FlexElement, { TypeFlexElement } from "components/atoms/flex-element/FlexElement";
import Select, { TypeValue } from "components/molecules/select/Select";
import React, { FC, memo } from "react";

type TypeEnum = {
  flexClassName?: string;
  selectClassName?: string;
  label: string;
  options: { label: string; value: string }[];
  onChange?: (value: TypeValue) => void;
} & TypeFlexElement;

const Enum: FC<TypeEnum> = memo(
  ({ flexClassName = "", selectClassName = "", label = "", options = [], onChange, ...props }) => {
    return (
      <FlexElement
        {...props}
        dimensionX={"fill"}
        alignment={"leftCenter"}
        dimensionY={"hug"}
        {...(flexClassName && { flexClassName })}
        children={
          <Select
            {...(selectClassName && { selectClassName })}
            placeholder={label}
            options={options}
            onChange={onChange || (() => {})}
          />
        }
      />
    );
  }
);

export default Enum;
