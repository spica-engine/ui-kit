import { ReactNode } from "react";
import { InputRegistry } from "../registry/InputRegistry";
import { InputConfig, InputValue, InputChangeEvent } from "../../types";
import { IInputRenderer } from "../abstractions";

/**
 * Factory for creating input components
 * Follows Factory Pattern and Dependency Inversion Principle
 */
export class InputFactory {
  constructor(private registry: InputRegistry) {}

  /**
   * Creates an input component based on configuration
   * @param config - The input configuration
   * @param key - The field key
   * @param value - The current value
   * @param onChange - Change handler
   * @returns React node or null if type not found
   */
  create(
    config: InputConfig,
    key: string,
    value: InputValue | undefined,
    onChange: (event: InputChangeEvent) => void
  ): ReactNode {
    const plugin = this.registry.get(config.type);

    if (!plugin) {
      console.error(`No plugin registered for input type: ${config.type}`);
      return null;
    }

    const renderer = plugin.renderer as IInputRenderer<InputValue>;

    // Transform value if transformer exists
    let transformedValue = value;
    if (plugin.transformer && value !== undefined) {
      transformedValue = plugin.transformer.transform(value);
    }

    // Create onChange handler that reverse-transforms the value
    const handleChange = (newValue: InputValue) => {
      let finalValue = newValue;
      if (plugin.transformer) {
        finalValue = plugin.transformer.reverseTransform(newValue);
      }
      onChange({ key, value: finalValue });
    };

    // Transform config to props
    const props = renderer.transformConfigToProps(config, transformedValue, handleChange);

    // Render the input
    return renderer.render(props);
  }

  /**
   * Checks if an input type is available
   * @param type - The input type to check
   * @returns True if available
   */
  canCreate(type: string): boolean {
    return this.registry.has(type as any);
  }
}
