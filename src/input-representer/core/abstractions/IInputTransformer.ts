import { InputValue } from "../../types";

/**
 * Interface for transforming values between formats
 * Useful for converting between API format and UI format
 */
export interface IInputTransformer<
  TInput extends InputValue = InputValue,
  TOutput extends InputValue = InputValue,
> {
  /**
   * Transforms input value to output value
   * @param value - The input value
   * @returns Transformed output value
   */
  transform(value: TInput): TOutput;

  /**
   * Transforms output value back to input value
   * @param value - The output value
   * @returns Transformed input value
   */
  reverseTransform(value: TOutput): TInput;
}
