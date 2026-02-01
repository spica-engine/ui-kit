import React, { memo } from "react";
import InputLabel from "./InputLabel";
import FlexElement, { TypeFlexElement } from "../flex-element/FlexElement";

export type TypeInputGroupProps = {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
} & TypeFlexElement;

export type TypeBaseInputComponent = React.FC<TypeInputGroupProps> & {
  Label: typeof InputLabel;
  HelperText: typeof FlexElement;
};

const InputGroupComponent: React.FC<TypeInputGroupProps> = ({ ref, children, ...props }) => {
  return (
    <FlexElement {...props} ref={ref}>
      {children}
    </FlexElement>
  );
};

const InputGroup = memo(InputGroupComponent) as unknown as TypeBaseInputComponent;

InputGroup.Label = InputLabel;
InputGroup.HelperText = FlexElement;

export default InputGroup;
