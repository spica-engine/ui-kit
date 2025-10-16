import React from "react";
import { InputRepresenter } from "../components/InputRepresenter";
import { InputProperties, InputValue, ObjectValue, ValidationError } from "../types";
import { InputPlugin } from "../core/plugin/InputPlugin";
import { InputRegistry } from "../core/registry/InputRegistry";

/**
 * Hook for using the new InputRepresenter
 * Provides a simple interface compatible with the old hook
 */
export interface UseInputRepresenterProps {
  properties: InputProperties;
  value?: InputValue | ObjectValue;
  error?: ValidationError;
  onChange?: (value: InputValue) => void;
  containerClassName?: string;
  errorClassName?: string;
  /**
   * Custom plugins to register for this instance
   * Use this to add your own custom input types
   */
  customPlugins?: InputPlugin<any>[];
  /**
   * Optional custom registry instance
   * If not provided, uses the global registry with custom plugins registered
   */
  registry?: InputRegistry;
}

export const useInputRepresenter = ({
  properties,
  value,
  error,
  onChange,
  containerClassName,
  errorClassName,
  customPlugins,
  registry,
}: UseInputRepresenterProps) => {
  // Create a custom registry if custom plugins are provided
  const customRegistry = React.useMemo(() => {
    if (registry) {
      return registry;
    }

    if (customPlugins && customPlugins.length > 0) {
      const newRegistry = new InputRegistry();
      // Import and register default plugins
      const { getDefaultPlugins } = require("../plugins");
      newRegistry.registerMany(getDefaultPlugins());
      // Register custom plugins (they can override defaults if they have higher priority)
      newRegistry.registerMany(customPlugins);
      return newRegistry;
    }

    return undefined; // Use global registry
  }, [customPlugins, registry]);
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
      registry={customRegistry}
    />
  );
};
