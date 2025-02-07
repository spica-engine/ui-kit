import React, { memo } from "react";
import InputLabel from "./InputLabel";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";

type TypeBaseInputProps = {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
} & TypeFlexElement;

type TypeBaseInputComponent = React.FC<TypeBaseInputProps> & {
  Label: typeof InputLabel;
  HelperText: typeof FlexElement;
};

const InputGroupComponent: React.FC<TypeBaseInputProps> = ({ ref, children, ...props }) => {
  return (
    <FlexElement ref={ref} {...props}>
      {children}
    </FlexElement>
  );
};

const InputGroup = memo(InputGroupComponent) as unknown as TypeBaseInputComponent;

InputGroup.Label = InputLabel;
InputGroup.HelperText = FlexElement;

export default InputGroup;
