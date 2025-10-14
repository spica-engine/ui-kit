import { IInputValidator } from "../abstractions";
import { InputValue, ValidationResult, ValidationRule, ValidationError } from "../../types";

/**
 * Default validator implementation
 */
class DefaultValidator implements IInputValidator {
  async validate(
    value: InputValue | undefined,
    rules?: ValidationRule[]
  ): Promise<ValidationResult> {
    if (!rules || rules.length === 0) {
      return { isValid: true };
    }

    const errors: string[] = [];

    for (const rule of rules) {
      const error = await this.validateRule(value, rule);
      if (error) {
        errors.push(error);
      }
    }

    if (errors.length > 0) {
      return {
        isValid: false,
        errors: errors.join(", "),
      };
    }

    return { isValid: true };
  }

  isRequired(value: InputValue | undefined): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === "string") {
      return value.trim() !== "";
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === "object") {
      return Object.keys(value).length > 0;
    }

    return true;
  }

  private async validateRule(
    value: InputValue | undefined,
    rule: ValidationRule
  ): Promise<string | null> {
    switch (rule.type) {
      case "required":
        return this.isRequired(value) ? null : rule.message || "This field is required";

      case "min":
        if (typeof value === "number" && value < rule.value) {
          return rule.message || `Value must be at least ${rule.value}`;
        }
        if (typeof value === "string" && value.length < rule.value) {
          return rule.message || `Must be at least ${rule.value} characters`;
        }
        if (Array.isArray(value) && value.length < rule.value) {
          return rule.message || `Must have at least ${rule.value} items`;
        }
        return null;

      case "max":
        if (typeof value === "number" && value > rule.value) {
          return rule.message || `Value must be at most ${rule.value}`;
        }
        if (typeof value === "string" && value.length > rule.value) {
          return rule.message || `Must be at most ${rule.value} characters`;
        }
        if (Array.isArray(value) && value.length > rule.value) {
          return rule.message || `Must have at most ${rule.value} items`;
        }
        return null;

      case "pattern":
        if (typeof value === "string") {
          const regex = new RegExp(rule.value);
          return regex.test(value) ? null : rule.message || "Invalid format";
        }
        return null;

      case "custom":
        if (rule.validator) {
          const isValid = await rule.validator(value);
          return isValid ? null : rule.message || "Validation failed";
        }
        return null;

      default:
        return null;
    }
  }
}

/**
 * Service for validating inputs
 * Follows Single Responsibility Principle
 */
export class ValidationService {
  private validators: Map<string, IInputValidator> = new Map();
  private defaultValidator = new DefaultValidator();

  /**
   * Registers a custom validator for a specific input type
   */
  registerValidator(type: string, validator: IInputValidator): void {
    this.validators.set(type, validator);
  }

  /**
   * Gets validator for a type
   */
  getValidator(type: string): IInputValidator {
    return this.validators.get(type) || this.defaultValidator;
  }

  /**
   * Validates a value
   */
  async validate(
    value: InputValue | undefined,
    type: string,
    rules?: ValidationRule[]
  ): Promise<ValidationResult> {
    const validator = this.getValidator(type);
    return validator.validate(value, rules);
  }

  /**
   * Validates multiple fields
   */
  async validateAll(
    values: Record<string, InputValue>,
    configs: Record<string, { type: string; validationRules?: ValidationRule[] }>
  ): Promise<{ isValid: boolean; errors: Record<string, ValidationError> }> {
    const errors: Record<string, ValidationError> = {};
    let isValid = true;

    for (const [key, config] of Object.entries(configs)) {
      const result = await this.validate(values[key], config.type, config.validationRules);
      if (!result.isValid && result.errors) {
        errors[key] = result.errors;
        isValid = false;
      }
    }

    return { isValid, errors };
  }
}
