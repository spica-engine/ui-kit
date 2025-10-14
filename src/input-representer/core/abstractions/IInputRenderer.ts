import { ReactNode } from "react";
import { BaseInputProps, InputValue, InputConfig } from "../../types";

/**
 * Interface for rendering input components
 * Follows Single Responsibility Principle - only handles rendering
 */
export interface IInputRenderer<
  TValue extends InputValue = InputValue,
  TProps extends BaseInputProps<TValue> = BaseInputProps<TValue>,
> {
  /**
   * Renders the input component
   * @param props - The props for the input
   * @returns React node to render
   */
  render(props: TProps): ReactNode;

  /**
   * Transforms the configuration into props
   * @param config - The input configuration
   * @param value - The current value
   * @param onChange - Change handler
   * @returns Props for the input
   */
  transformConfigToProps(
    config: InputConfig,
    value: TValue | undefined,
    onChange: (value: TValue) => void
  ): TProps;
}
