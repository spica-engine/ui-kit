/**
 * REFACTORED: This file now uses the new Input Representer architecture
 * Original implementation preserved for type exports
 * New implementation uses SOLID principles and plugin architecture
 */

import { TypeCoordinates } from "../components/atoms/map/Map";
import { ReactNode } from "react";
import { utils } from "utils";
import { TypeChipInput } from "@molecules/chip/ChipInput";
import { RelationType } from "@atoms/relation-input/RelationInput";
import { IconName, TypeLabeledValue, TypeSwitch } from "index.export";

// Import new architecture
import { useLegacyInputRepresenter } from "../input-representer/legacy/useLegacyInputRepresenter";

export type TypeProperties = {
  [key: string]: {
    type: keyof typeof types;
    title: string;
    description?: string;
    options?: TypeOptions;
    enum?: (string | number)[];
    default?: TypeValueType;
    items?: TypeArrayItems;
    minItems?: number;
    maxItems?: number;
    locationType?: string;
    className?: string;
    properties?: TypeProperties;
    renderCondition?: { field: string; equals: any } | { field: string; notEquals: any };
    getOptions?: () => Promise<TypeLabeledValue[]>;
    loadMoreOptions?: () => Promise<TypeLabeledValue[]>;
    searchOptions?: (value: string) => Promise<TypeLabeledValue[]>;
    totalOptionsLength?: number;
    size?: TypeSwitch["size"];
    valueType?: TypeChipInput["valueType"];
    error?: TypeInputRepresenterError | string;
    id?: string;
    relationType?: RelationType;
    icon?: IconName;
    placeholder?: string;
    popupClassName?: string;
  };
};

export type TypeValueType =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | TypeRepresenterValue
  | TypeRepresenterValue[];

export type TypeRepresenterValue = {
  [key: string]: TypeValueType | TypeRepresenterValue;
};

export type TypeInputType =
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

type TypeOptions = {
  position?: "top" | "bottom" | "left" | "right";
  index?: boolean;
};

export type TypeArrayItems = {
  title?: string;
  type: TypeInputType;
  properties: TypeProperties;
  enum?: (number | string)[];
};

export type TypeChangeEvent<T> = {
  key: string;
  value: T;
};

export type TypeInputProps<T> = {
  key: string;
  title: string;
  description: string;
  value?: T;
  className?: string;
  onChange?: ({ key, value }: TypeChangeEvent<T>) => void;
  size?: TypeSwitch["size"];
  icon?: IconName;
  placeholder?: string;
};

export type TypeInputRepresenterError = {
  [key: string]: string | TypeInputRepresenterError;
};

type TypeObjectInputProps<T> = {
  key?: string;
  properties?: TypeProperties;
  errors?: TypeInputRepresenterError | string | null;
} & TypeInputProps<T>;

type TypeSelectInputProps<T extends string | number> = {
  enum?: T[];
} & TypeInputProps<T>;

type TypeNumberInput = {
  enum?: number[];
} & TypeInputProps<number | undefined>;

type TypeMultiSelectInputProps<T extends string | number> = {
  enum?: T[];
} & TypeInputProps<T[]>;

type TypeArrayInputProps<T> = {
  minItems?: number;
  maxItems?: number;
  items?: TypeArrayItems;
  errors?: TypeInputRepresenterError | string | null;
} & TypeInputProps<T[]>;

type TypeRelationInputProps<T> = {
  getOptions: () => Promise<TypeLabeledValue[]>;
  loadMoreOptions: () => Promise<TypeLabeledValue[]>;
  searchOptions: (value: string) => Promise<TypeLabeledValue[]>;
  totalOptionsLength: number;
  relationType?: RelationType;
  popupClassName?: string;
} & TypeInputProps<T>;

type TypeChipInputProps<T> = {
  valueType?: TypeChipInput["valueType"];
} & TypeInputProps<T>;

export type TypeInputTypeMap = {
  string: (props: TypeSelectInputProps<string>) => ReactNode;
  number: (props: TypeNumberInput) => ReactNode;
  textarea: (props: TypeInputProps<string>) => ReactNode;
  date: (props: TypeInputProps<Date | string | null>) => ReactNode;
  boolean: (props: TypeInputProps<boolean>) => ReactNode;
  color: (props: TypeInputProps<string>) => ReactNode;
  storage: (props: TypeInputProps<string>) => ReactNode;
  multiselect: (props: TypeMultiSelectInputProps<string | number>) => ReactNode;
  location: (props: TypeInputProps<TypeCoordinates | utils.api.TypeLocation>) => ReactNode;
  richtext: (props: TypeInputProps<string>) => ReactNode;
  object: (props: TypeObjectInputProps<TypeRepresenterValue>) => ReactNode;
  array: (props: TypeArrayInputProps<TypeValueType>) => ReactNode;
  chip: (props: TypeChipInputProps<string[] | number[]>) => ReactNode;
  relation: (props: TypeRelationInputProps<TypeLabeledValue[] | TypeLabeledValue>) => ReactNode;
  select: (props: TypeSelectInputProps<string>) => ReactNode;
};

// Deprecated: This object is kept for type inference only
// Actual implementation uses new plugin system
const types: TypeInputTypeMap = {} as TypeInputTypeMap;

type TypeUseInputRepresenter = {
  properties: TypeProperties;
  value?: TypeValueType | TypeRepresenterValue;
  error?: TypeInputRepresenterError;
  onChange?: (value: any) => void;
  containerClassName?: string;
  errorClassName?: string;
};

/**
 * REFACTORED: Now uses new plugin-based architecture
 * Maintains backward compatibility with existing API
 *
 * Benefits of new implementation:
 * - SOLID principles applied
 * - Plugin architecture allows easy extension
 * - Better type safety
 * - Easier to test
 * - Better separation of concerns
 */
const useInputRepresenter = ({
  properties,
  value,
  error,
  onChange,
  containerClassName,
  errorClassName,
}: TypeUseInputRepresenter) => {
  return useLegacyInputRepresenter({
    properties,
    value,
    error,
    onChange,
    containerClassName,
    errorClassName,
  });
};

export default useInputRepresenter;
