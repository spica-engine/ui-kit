import { IInputRenderer, IInputValidator, IInputTransformer } from "../abstractions";
import { InputType, InputValue } from "../../types";

/**
 * Plugin interface for input types
 * Follows Open/Closed Principle - system is open for extension via plugins
 */
export interface InputPlugin<TValue extends InputValue = InputValue> {
  /**
   * Unique type identifier
   */
  readonly type: InputType;

  /**
   * Renderer for this input type
   */
  readonly renderer: IInputRenderer<TValue>;

  /**
   * Optional validator for this input type
   */
  readonly validator?: IInputValidator<TValue>;

  /**
   * Optional transformer for this input type
   */
  readonly transformer?: IInputTransformer<TValue>;

  /**
   * Optional priority for registration (higher = higher priority)
   */
  readonly priority?: number;
}

/**
 * Base abstract class for creating plugins
 * Provides common functionality
 */
export abstract class BaseInputPlugin<TValue extends InputValue = InputValue>
  implements InputPlugin<TValue>
{
  abstract readonly type: InputType;
  abstract readonly renderer: IInputRenderer<TValue>;

  readonly validator?: IInputValidator<TValue>;
  readonly transformer?: IInputTransformer<TValue>;
  readonly priority: number = 0;

  constructor(priority?: number) {
    if (priority !== undefined) {
      this.priority = priority;
    }
  }
}
