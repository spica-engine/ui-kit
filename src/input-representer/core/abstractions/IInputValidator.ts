import { InputValue, ValidationResult, ValidationRule } from "../../types";

/**
 * Interface for validating input values
 * Follows Single Responsibility Principle - only handles validation
 */
export interface IInputValidator<TValue extends InputValue = InputValue> {
  /**
   * Validates a value against rules
   * @param value - The value to validate
   * @param rules - Validation rules to apply
   * @returns Validation result
   */
  validate(value: TValue | undefined, rules?: ValidationRule[]): Promise<ValidationResult>;

  /**
   * Checks if a value is required
   * @param value - The value to check
   * @returns True if value is present
   */
  isRequired(value: TValue | undefined): boolean;
}
