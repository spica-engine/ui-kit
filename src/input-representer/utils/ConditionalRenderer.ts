import { IConditionalRenderer } from "../core/abstractions";
import { RenderCondition, InputValue } from "../types";

/**
 * Handles conditional rendering logic
 * Implements Single Responsibility Principle
 */
export class ConditionalRenderer implements IConditionalRenderer {
  shouldRender(
    condition: RenderCondition | undefined,
    context: Record<string, InputValue>
  ): boolean {
    if (!condition) {
      return true;
    }

    const { field } = condition;
    const currentFieldValue = context[field];

    if ("equals" in condition) {
      return this.checkEquality(currentFieldValue, condition.equals);
    }

    if ("notEquals" in condition) {
      return !this.checkEquality(currentFieldValue, condition.notEquals);
    }

    return true;
  }

  private checkEquality(
    currentValue: InputValue,
    conditionValue: InputValue | InputValue[]
  ): boolean {
    if (Array.isArray(conditionValue)) {
      return conditionValue.some((val) => this.valuesEqual(currentValue, val));
    }
    return this.valuesEqual(currentValue, conditionValue);
  }

  private valuesEqual(a: InputValue, b: InputValue): boolean {
    // Handle null/undefined
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;

    // Handle primitives
    if (typeof a !== "object" || typeof b !== "object") {
      return a === b;
    }

    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((val, idx) => this.valuesEqual(val, b[idx]));
    }

    // Handle objects
    if (!Array.isArray(a) && !Array.isArray(b)) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      return keysA.every((key) => this.valuesEqual(a[key], b[key]));
    }

    return false;
  }
}
