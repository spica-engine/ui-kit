import React from "react";
import { InputConfig, InputValue, InputChangeEvent } from "../types";
import { IErrorPresenter } from "../core/abstractions";
import { InputFactory } from "../core/factories/InputFactory";

/**
 * Container for individual input fields
 * Handles rendering, error display, and styling
 */
interface InputContainerProps {
  fieldKey: string;
  config: InputConfig;
  value: InputValue | undefined;
  onChange: (event: InputChangeEvent) => void;
  factory: InputFactory;
  errorPresenter: IErrorPresenter;
  containerClassName?: string;
  errorClassName?: string;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  fieldKey,
  config,
  value,
  onChange,
  factory,
  errorPresenter,
  containerClassName,
  errorClassName,
}) => {
  const hasCustomStyles = Boolean(containerClassName || errorClassName);
  const error = config.error;

  const inputElement = factory.create(config, fieldKey, value, onChange);

  return (
    <div
      style={hasCustomStyles ? undefined : { position: "relative", width: "100%" }}
      className={containerClassName}
      key={fieldKey}
      id={config.id ?? undefined}
    >
      {inputElement}
      {error && typeof error === "string" && errorPresenter.present(error, errorClassName)}
    </div>
  );
};
