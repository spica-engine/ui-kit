import { RenderCondition, InputValue } from "../../types";

/**
 * Interface for handling conditional rendering logic
 * Follows Single Responsibility Principle
 */
export interface IConditionalRenderer {
  /**
   * Determines if a field should be rendered based on conditions
   * @param condition - The render condition
   * @param context - The current values context
   * @returns True if should render
   */
  shouldRender(
    condition: RenderCondition | undefined,
    context: Record<string, InputValue>
  ): boolean;
}
