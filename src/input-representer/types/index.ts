import { ReactNode } from "react";
import { IconName, TypeLabeledValue, TypeSwitch } from "../../index.export";
import { TypeCoordinates } from "../../components/atoms/map/Map";
import { utils } from "utils";

/**
 * Base value types that can be represented
 */
export type PrimitiveValue = string | number | boolean | Date | null;
export type ObjectValue = { [key: string]: InputValue };
export type ArrayValue = InputValue[];
export type InputValue = PrimitiveValue | ArrayValue | ObjectValue;

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError;
}

export type ValidationError = string | { [key: string]: ValidationError };

/**
 * Input change event
 */
export interface InputChangeEvent<T = InputValue> {
  key: string;
  value: T;
}

/**
 * Base configuration for all inputs
 */
export interface BaseInputConfig {
  type: InputType;
  title: string;
  description?: string;
  className?: string;
  id?: string;
  default?: InputValue;
}

/**
 * Configuration for inputs that support validation
 */
export interface ValidatableInputConfig {
  error?: ValidationError;
  required?: boolean;
  validationRules?: ValidationRule[];
}

/**
 * Configuration for inputs with options/enum
 */
export interface SelectableInputConfig {
  enum?: (string | number)[];
}

/**
 * Configuration for inputs with async options
 */
export interface AsyncSelectableInputConfig {
  getOptions?: () => Promise<TypeLabeledValue[]>;
  loadMoreOptions?: () => Promise<TypeLabeledValue[]>;
  searchOptions?: (value: string) => Promise<TypeLabeledValue[]>;
  totalOptionsLength?: number;
}

/**
 * Configuration for composite inputs (object/array)
 */
export interface ComposableInputConfig {
  properties?: InputProperties;
  items?: ArrayItemsConfig;
  minItems?: number;
  maxItems?: number;
}

/**
 * Configuration for conditional rendering
 */
export interface ConditionalInputConfig {
  renderCondition?: RenderCondition;
}

/**
 * Configuration for styled inputs
 */
export interface StyledInputConfig {
  size?: TypeSwitch["size"];
  icon?: IconName;
  placeholder?: string;
  popupClassName?: string;
}

/**
 * Render condition types
 */
export type RenderCondition =
  | { field: string; equals: InputValue | InputValue[] }
  | { field: string; notEquals: InputValue | InputValue[] };

/**
 * Validation rule
 */
export interface ValidationRule {
  type: "required" | "min" | "max" | "pattern" | "custom";
  value?: any;
  message?: string;
  validator?: (value: InputValue) => boolean | Promise<boolean>;
}

/**
 * Array items configuration
 */
export interface ArrayItemsConfig {
  title?: string;
  type: InputType;
  properties?: InputProperties;
  enum?: (number | string)[];
}

/**
 * Number input specific config
 */
export interface NumberInputConfig {
  min?: number;
  max?: number;
}

/**
 * Chip input specific config
 */
export interface ChipInputConfig extends StyledInputConfig {
  valueType?: "string" | "number";
}

/**
 * Relation input specific config
 */
export interface RelationInputConfig extends AsyncSelectableInputConfig {
  relationType?: "onetoone" | "onetomany";
}

/**
 * Location input specific config
 */
export interface LocationInputConfig {
  locationType?: string;
}

/**
 * All input types
 */
export type InputType =
  | "string"
  | "number"
  | "textarea"
  | "date"
  | "boolean"
  | "color"
  | "storage"
  | "multiselect"
  | "location"
  | "richtext"
  | "object"
  | "array"
  | "chip"
  | "relation"
  | "select";

/**
 * Full input configuration - discriminated union based on type
 */
export type InputConfig =
  | (BaseInputConfig &
      ValidatableInputConfig &
      SelectableInputConfig &
      StyledInputConfig & { type: "string" })
  | (BaseInputConfig &
      ValidatableInputConfig &
      SelectableInputConfig &
      NumberInputConfig &
      StyledInputConfig & { type: "number" })
  | (BaseInputConfig & ValidatableInputConfig & StyledInputConfig & { type: "textarea" })
  | (BaseInputConfig & ValidatableInputConfig & StyledInputConfig & { type: "date" })
  | (BaseInputConfig & ValidatableInputConfig & StyledInputConfig & { type: "boolean" })
  | (BaseInputConfig & ValidatableInputConfig & StyledInputConfig & { type: "color" })
  | (BaseInputConfig & ValidatableInputConfig & { type: "storage" })
  | (BaseInputConfig &
      ValidatableInputConfig &
      SelectableInputConfig &
      StyledInputConfig & { type: "multiselect" })
  | (BaseInputConfig &
      ValidatableInputConfig &
      LocationInputConfig &
      StyledInputConfig & { type: "location" })
  | (BaseInputConfig & ValidatableInputConfig & StyledInputConfig & { type: "richtext" })
  | (BaseInputConfig &
      ValidatableInputConfig &
      ComposableInputConfig &
      StyledInputConfig & { type: "object" })
  | (BaseInputConfig &
      ValidatableInputConfig &
      ComposableInputConfig &
      StyledInputConfig & { type: "array" })
  | (BaseInputConfig & ValidatableInputConfig & ChipInputConfig & { type: "chip" })
  | (BaseInputConfig &
      ValidatableInputConfig &
      RelationInputConfig &
      StyledInputConfig & { type: "relation" })
  | (BaseInputConfig &
      ValidatableInputConfig &
      SelectableInputConfig &
      StyledInputConfig & { type: "select" });

/**
 * Input properties map
 */
export type InputProperties = {
  [key: string]: InputConfig & ConditionalInputConfig;
};

/**
 * Props passed to input renderers
 */
export interface BaseInputProps<T = InputValue> {
  key: string;
  title: string;
  description?: string;
  value?: T;
  className?: string;
  onChange?: (event: InputChangeEvent<T>) => void;
  error?: ValidationError;
}

/**
 * Extended props for specific input types
 */
export interface StringInputProps extends BaseInputProps<string> {
  options?: string[];
  size?: TypeSwitch["size"];
  icon?: IconName;
  placeholder?: string;
}

export interface NumberInputProps extends BaseInputProps<number> {
  options?: number[];
  min?: number;
  max?: number;
}

export interface TextAreaInputProps extends BaseInputProps<string> {
  icon?: IconName;
  placeholder?: string;
}

export interface DateInputProps extends BaseInputProps<Date | string | null> {}

export interface BooleanInputProps extends BaseInputProps<boolean> {
  size?: TypeSwitch["size"];
}

export interface ColorInputProps extends BaseInputProps<string> {}

export interface StorageInputProps extends BaseInputProps<string> {
  onUpload?: (file: File) => void;
}

export interface MultiSelectInputProps extends BaseInputProps<(string | number)[]> {
  options?: (string | number)[];
}

export interface LocationInputProps
  extends BaseInputProps<TypeCoordinates | utils.api.TypeLocation> {}

export interface RichTextInputProps extends BaseInputProps<string> {}

export interface ObjectInputProps extends BaseInputProps<ObjectValue> {
  properties: InputProperties;
  errors?: ValidationError;
}

export interface ArrayInputProps extends BaseInputProps<ArrayValue> {
  minItems?: number;
  maxItems?: number;
  items?: ArrayItemsConfig;
  errors?: ValidationError;
}

export interface ChipInputProps extends BaseInputProps<string[] | number[]> {
  valueType?: "string" | "number";
}

export interface RelationInputProps extends BaseInputProps<TypeLabeledValue | TypeLabeledValue[]> {
  getOptions: () => Promise<TypeLabeledValue[]>;
  loadMoreOptions: () => Promise<TypeLabeledValue[]>;
  searchOptions: (value: string) => Promise<TypeLabeledValue[]>;
  totalOptionsLength: number;
  relationType?: "onetoone" | "onetomany";
  popupClassName?: string;
}

export interface SelectInputProps extends BaseInputProps<string> {
  options?: string[];
}

/**
 * Context for rendering
 */
export interface RenderContext {
  values: Record<string, InputValue>;
  errors?: Record<string, ValidationError>;
  onChange?: (event: InputChangeEvent) => void;
}
