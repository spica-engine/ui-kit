import React, { useMemo } from "react";
import { InputProperties, InputValue, InputChangeEvent, ObjectValue } from "../types";
import { InputRegistry, globalInputRegistry } from "../core/registry/InputRegistry";
import { InputFactory } from "../core/factories/InputFactory";
import { ConditionalRenderer } from "../utils/ConditionalRenderer";
import { ErrorPresenter } from "../utils/ErrorPresenter";
import { ValueManager } from "../utils/ValueManager";
import { InputContainer } from "./InputContainer";

/**
 * Main component for rendering input fields based on schema
 * Implements Dependency Injection and uses composition
 */
interface InputRepresenterProps {
  properties: InputProperties;
  value?: InputValue | ObjectValue;
  onChange?: (value: InputValue) => void;
  containerClassName?: string;
  errorClassName?: string;
  registry?: InputRegistry;
}

export const InputRepresenter: React.FC<InputRepresenterProps> = ({
  properties,
  value,
  onChange,
  containerClassName,
  errorClassName,
  registry = globalInputRegistry,
}) => {
  // Create service instances (could be injected via context in the future)
  const factory = useMemo(() => new InputFactory(registry), [registry]);
  const conditionalRenderer = useMemo(() => new ConditionalRenderer(), []);
  const errorPresenter = useMemo(() => new ErrorPresenter(), []);
  const valueManager = useMemo(() => new ValueManager(), []);

  const handleChange = (event: InputChangeEvent) => {
    const updatedValue = valueManager.setValue(event.key, event.value, value ?? {});
    onChange?.(updatedValue);
  };

  const objectValue = valueManager.ensureObject(value);

  return (
    <>
      {Object.entries(properties).map(([key, config]) => {
        // Check render condition
        if (!conditionalRenderer.shouldRender(config.renderCondition, objectValue)) {
          return null;
        }

        const fieldValue = valueManager.getValue(key, objectValue);

        return (
          <InputContainer
            key={key}
            fieldKey={key}
            config={config}
            value={fieldValue}
            onChange={handleChange}
            factory={factory}
            errorPresenter={errorPresenter}
            containerClassName={containerClassName}
            errorClassName={errorClassName}
          />
        );
      })}
    </>
  );
};
