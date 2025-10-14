import { IInputRenderer } from "../../core/abstractions";
import { BaseInputProps, InputValue, InputConfig } from "../../types";

/**
 * Abstract base renderer providing common functionality
 * Implements Template Method Pattern
 */
export abstract class BaseRenderer<
  TValue extends InputValue = InputValue,
  TProps extends BaseInputProps<TValue> = BaseInputProps<TValue>,
> implements IInputRenderer<TValue, TProps>
{
  abstract render(props: TProps): React.ReactNode;

  transformConfigToProps(
    config: InputConfig,
    value: TValue | undefined,
    onChange: (value: TValue) => void
  ): TProps {
    const baseProps: BaseInputProps<TValue> = {
      key: "", // Will be set by factory
      title: config.title,
      description: config.description,
      value,
      className: config.className,
      onChange: (event) => onChange(event.value),
      error: config.error,
    };

    return this.extendProps(baseProps, config) as TProps;
  }

  /**
   * Override this to add type-specific props
   */
  protected extendProps(
    baseProps: BaseInputProps<TValue>,
    config: InputConfig
  ): BaseInputProps<TValue> | TProps {
    return baseProps;
  }
}
