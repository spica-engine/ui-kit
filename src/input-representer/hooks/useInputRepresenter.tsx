import React from "react";
import { InputRepresenter } from "../components/InputRepresenter";
import { InputProperties, InputValue, ObjectValue, ValidationError } from "../types";

/**
 * Hook for using the new InputRepresenter
 * Provides a simple interface compatible with the old hook
 */
interface UseInputRepresenterProps {
  properties: InputProperties;
  value?: InputValue | ObjectValue;
  error?: ValidationError;
  onChange?: (value: InputValue) => void;
  containerClassName?: string;
  errorClassName?: string;
}

export const useInputRepresenter = ({
  properties,
  value,
  error,
  onChange,
  containerClassName,
  errorClassName,
}: UseInputRepresenterProps) => {
  // Merge errors into properties
  const propertiesWithErrors = React.useMemo(() => {
    if (!error || typeof error === "string") {
      return properties;
    }

    const merged = { ...properties };
    Object.keys(error).forEach((key) => {
      if (merged[key]) {
        merged[key] = {
          ...merged[key],
          error: error[key],
        };
      }
    });

    return merged;
  }, [properties, error]);

  return (
    <InputRepresenter
      properties={propertiesWithErrors}
      value={value}
      onChange={onChange}
      containerClassName={containerClassName}
      errorClassName={errorClassName}
    />
  );
};
