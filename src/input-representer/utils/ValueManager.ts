import { InputValue, ObjectValue } from "../types";

/**
 * Handles value access and manipulation
 * Implements Single Responsibility Principle
 */
export class ValueManager {
  /**
   * Gets a value from an object using a key path
   */
  getValue(key: string, source: InputValue | undefined): InputValue | undefined {
    if (!source || typeof source !== "object" || Array.isArray(source)) {
      return source;
    }

    return (source as ObjectValue)[key];
  }

  /**
   * Sets a value in an object (immutably)
   */
  setValue(key: string, value: InputValue, target: InputValue): InputValue {
    if (!target || typeof target !== "object" || Array.isArray(target)) {
      return { [key]: value };
    }

    const updatedValue = this.deepClone(target) as ObjectValue;
    updatedValue[key] = value;
    return updatedValue;
  }

  /**
   * Deep clones a value
   */
  deepClone(value: InputValue): InputValue {
    if (value === null || value === undefined) {
      return value;
    }

    if (typeof value !== "object") {
      return value;
    }

    if (value instanceof Date) {
      return new Date(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.deepClone(item));
    }

    const cloned: ObjectValue = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        cloned[key] = this.deepClone((value as ObjectValue)[key]);
      }
    }
    return cloned;
  }

  /**
   * Checks if a value is empty
   */
  isEmpty(value: InputValue | undefined): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === "string") {
      return value.trim() === "";
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === "object") {
      return Object.keys(value).length === 0;
    }

    return false;
  }

  /**
   * Converts value to object if it isn't already
   */
  ensureObject(value: InputValue | undefined): ObjectValue {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as ObjectValue;
    }
    return {};
  }
}
