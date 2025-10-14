import { ReactNode } from "react";
import { ValidationError } from "../../types";

/**
 * Interface for presenting validation errors
 * Follows Single Responsibility Principle
 */
export interface IErrorPresenter {
  /**
   * Renders an error message
   * @param error - The error to present
   * @param className - Optional CSS class
   * @returns React node with error display
   */
  present(error: ValidationError | undefined, className?: string): ReactNode;

  /**
   * Gets error for a specific field path
   * @param error - The error object
   * @param path - Dot-notation path to field
   * @returns Error for that field
   */
  getErrorForPath(error: ValidationError | undefined, path: string): string | undefined;
}
