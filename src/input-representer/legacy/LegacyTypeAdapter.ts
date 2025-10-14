/**
 * Adapter for converting legacy types to new types
 * Ensures backward compatibility
 */

import {
  InputProperties as NewInputProperties,
  InputConfig as NewInputConfig,
  ValidationError as NewValidationError,
  InputValue as NewInputValue,
  ObjectValue as NewObjectValue,
} from "../types";

// Legacy types from original implementation
export type TypeProperties = {
  [key: string]: {
    type: keyof typeof types;
    title: string;
    description?: string;
    options?: any;
    enum?: (string | number)[];
    default?: any;
    items?: any;
    minItems?: number;
    maxItems?: number;
    locationType?: string;
    className?: string;
    properties?: TypeProperties;
    renderCondition?: { field: string; equals: any } | { field: string; notEquals: any };
    getOptions?: () => Promise<any[]>;
    loadMoreOptions?: () => Promise<any[]>;
    searchOptions?: (value: string) => Promise<any[]>;
    totalOptionsLength?: number;
    size?: any;
    valueType?: any;
    error?: TypeInputRepresenterError | string;
    id?: string;
    relationType?: "onetoone" | "onetomany";
    icon?: any;
    placeholder?: string;
    popupClassName?: string;
  };
};

export type TypeInputRepresenterError = {
  [key: string]: string | TypeInputRepresenterError;
};

const types = {
  string: true,
  number: true,
  textarea: true,
  date: true,
  boolean: true,
  color: true,
  storage: true,
  multiselect: true,
  location: true,
  richtext: true,
  object: true,
  array: true,
  chip: true,
  relation: true,
  select: true,
};

/**
 * Converts legacy TypeProperties to new InputProperties
 */
export function convertLegacyProperties(legacy: TypeProperties): NewInputProperties {
  const result: NewInputProperties = {};

  for (const [key, config] of Object.entries(legacy)) {
    result[key] = convertLegacyConfig(config);
  }

  return result;
}

/**
 * Converts a single legacy config to new config
 */
function convertLegacyConfig(legacy: TypeProperties[string]): NewInputConfig {
  const base: any = {
    type: legacy.type,
    title: legacy.title,
    description: legacy.description,
    className: legacy.className,
    id: legacy.id,
    default: legacy.default,
    error: legacy.error,
  };

  // Add conditional rendering
  if (legacy.renderCondition) {
    base.renderCondition = legacy.renderCondition;
  }

  // Add type-specific properties
  if (legacy.enum) {
    base.enum = legacy.enum;
  }

  if (legacy.properties) {
    base.properties = convertLegacyProperties(legacy.properties);
  }

  if (legacy.items) {
    base.items = {
      ...legacy.items,
      properties: legacy.items.properties
        ? convertLegacyProperties(legacy.items.properties)
        : undefined,
    };
  }

  if (legacy.minItems !== undefined) {
    base.minItems = legacy.minItems;
  }

  if (legacy.maxItems !== undefined) {
    base.maxItems = legacy.maxItems;
  }

  if (legacy.getOptions) {
    base.getOptions = legacy.getOptions;
  }

  if (legacy.loadMoreOptions) {
    base.loadMoreOptions = legacy.loadMoreOptions;
  }

  if (legacy.searchOptions) {
    base.searchOptions = legacy.searchOptions;
  }

  if (legacy.totalOptionsLength !== undefined) {
    base.totalOptionsLength = legacy.totalOptionsLength;
  }

  if (legacy.size) {
    base.size = legacy.size;
  }

  if (legacy.valueType) {
    base.valueType = legacy.valueType;
  }

  if (legacy.relationType) {
    base.relationType = legacy.relationType;
  }

  if (legacy.icon) {
    base.icon = legacy.icon;
  }

  if (legacy.placeholder) {
    base.placeholder = legacy.placeholder;
  }

  if (legacy.popupClassName) {
    base.popupClassName = legacy.popupClassName;
  }

  if (legacy.locationType) {
    base.locationType = legacy.locationType;
  }

  return base as NewInputConfig;
}

/**
 * Converts legacy error format to new format
 */
export function convertLegacyError(
  error: TypeInputRepresenterError | string | undefined
): NewValidationError | undefined {
  return error as NewValidationError | undefined;
}

/**
 * Converts legacy value to new value (usually compatible)
 */
export function convertLegacyValue(value: any): NewInputValue | NewObjectValue | undefined {
  return value as NewInputValue | NewObjectValue | undefined;
}
