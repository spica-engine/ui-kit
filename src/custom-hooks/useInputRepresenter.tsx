import { TypeCoordinates } from "components/atoms/map/Map";
import { ReactNode } from "react";
import StringInput from "../components/atoms/inputs/normal/string/String";
import NumberInput from "../components/atoms/inputs/normal/number/Number";
import TextAreaInput from "../components/atoms/inputs/normal/text-area/TextArea";
import DateInput from "../components/atoms/inputs/normal/date/Date";
import BooleanInput from "../components/atoms/inputs/normal/boolean/Boolean";
import ColorInput from "../components/atoms/inputs/normal/color/Color";
import StorageInput from "../components/atoms/inputs/normal/storage/Storage";
import MultipleSelectionInput from "../components/atoms/inputs/normal/multiple-selection/MultipleSelection";
import LocationInput from "../components/atoms/inputs/normal/location/Location";
import RichTextInput from "../components/atoms/inputs/normal/rich-text/RichText";
import Icon from "components/atoms/icon/Icon";
import ObjectInput from "components/atoms/inputs/normal/object/ObjectInput";
import ArrayInput from "components/atoms/inputs/normal/array/ArrayInput";
import { utils } from "utils";
import ChipInput from "components/atoms/inputs/normal/chip/ChipInput";
import Text from "components/atoms/text/Text";
import RelationInput from "@atoms/relation-input/RelationInput";
import { Select, TypeLabeledValue } from "index.export";

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
};

export type TypeInputRepresenterError = { [key: string]: string | null };

type TypeObjectInputProps<T> = {
  key?: string;
  properties?: TypeProperties;
} & TypeInputProps<T>;

type TypeSelectInputProps<T extends string | number> = {
  enum?: T[];
} & TypeInputProps<T>;

type TypeMultiSelectInputProps<T extends string | number> = {
  enum?: T[];
} & TypeInputProps<T[]>;

type TypeArrayInputProps<T> = {
  minItems?: number;
  maxItems?: number;
  items?: TypeArrayItems;
} & TypeInputProps<T[]>;

type TypeRelationInputProps<T> = {
  getOptions: () => Promise<TypeLabeledValue[]>;
  loadMoreOptions: () => Promise<TypeLabeledValue[]>;
  searchOptions: (value: string) => Promise<TypeLabeledValue[]>;
  totalOptionsLength: number;
} & TypeInputProps<T>;

export type TypeInputTypeMap = {
  string: (props: TypeSelectInputProps<string>) => ReactNode;
  number: (props: TypeSelectInputProps<number>) => ReactNode;
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
  chip: (props: TypeInputProps<string[]>) => ReactNode;
  relation: (props: TypeRelationInputProps<TypeLabeledValue[] | TypeLabeledValue>) => ReactNode;
  select: (props: TypeSelectInputProps<string>) => ReactNode;
};

const types: TypeInputTypeMap = {
  string: (props) => (
    <StringInput
      label={props.title}
      description={props.description}
      inputContainerClassName={props.className}
      value={props.value}
      options={props.enum}
      onChange={(value) => {
        props.onChange?.({ key: props.key, value });
      }}
    />
  ),
  number: (props) => (
    <NumberInput
      label={props.title}
      description={props.description}
      inputContainerClassName={props.className}
      value={props.value}
      options={props.enum}
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  textarea: (props) => (
    <TextAreaInput
      title={props.title}
      titlePrefixProps={{ children: <Icon name="formatSize" /> }}
      containerProps={{ className: props.className }}
      value={props.value}
      onChange={(event) => props.onChange?.({ key: props.key, value: event.target.value })}
    />
  ),
  date: (props) => (
    <DateInput
      label={props.title}
      description={props.description}
      inputContainerClassName={props.className}
      value={props.value}
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  boolean: (props) => (
    <BooleanInput
      checked={props.value}
      label={props.title}
      description={props.description}
      containerProps={{ dimensionX: "fill" }}
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  color: (props) => (
    <ColorInput
      label={props.title}
      description={props.description}
      inputContainerClassName={props.className}
      value={props.value}
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  storage: (props) => (
    <StorageInput
      onUpload={() => {}}
      label={props.title}
      containerProps={{
        className: props.className,
      }}
    />
  ),
  multiselect: (props) => (
    <MultipleSelectionInput
      label={props.title}
      description={props.description}
      inputContainerClassName={props.className}
      value={props.value}
      options={props.enum}
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  location: (props) => {
    if (utils.api.isTypeLocation(props.value)) {
      const coordinates = props?.value.coordinates;
      props.value = { lat: coordinates[1], lng: coordinates[0] };
    }

    const handleChangeLocation = (value: TypeCoordinates) => {
      let normalizedValue: utils.api.TypeLocation | TypeCoordinates = value;
      if (utils.api.isTypeLocation(props.value)) {
        normalizedValue = {
          type: "Point",
          coordinates: [value.lng, value.lng],
        };
      }
      props.onChange?.({ key: props.key, value: normalizedValue });
    };

    return (
      <LocationInput
        title={props.title}
        dimensionX="fill"
        coordinates={props.value as TypeCoordinates}
        onChange={handleChangeLocation}
      />
    );
  },
  richtext: (props) => (
    <RichTextInput
      headerProps={{ label: props.title, icon: "formatAlignCenter" }}
      value={props.value}
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  object: (props) => {
    return (
      <ObjectInput
        properties={props.properties!}
        title={props.title}
        description={props.description}
        value={props.value}
        onChange={(value) => {
          props.onChange?.({ key: props.key, value });
        }}
      />
    );
  },
  array: (props) => {
    return (
      <ArrayInput
        title={props.title}
        description={props.description}
        value={props.value}
        onChange={(value) => props.onChange?.({ key: props.title, value })}
        minItems={props.minItems}
        maxItems={props.maxItems}
        items={props.items}
        propertyKey={props.key}
      />
    );
  },
  chip: (props) => {
    return (
      <ChipInput
        value={props.value ?? []}
        onChange={(value) => {
          props.onChange?.({ key: props.key, value });
        }}
      />
    );
  },
  relation: (props) => {
    return (
      <RelationInput
        value={props.value}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
        label={props.title}
        getOptions={props.getOptions}
        loadMoreOptions={props.loadMoreOptions}
        searchOptions={props.searchOptions}
        totalOptionsLength={props.totalOptionsLength}
      />
    );
  },
  select: (props) => {
    return (
      <Select
        options={props.enum as string[]}
        value={props.value}
        onChange={(value) => {
          props.onChange?.({ key: props.key, value: value as string });
        }}
      />
    );
  },
};

type TypeUseInputRepresenter = {
  properties: TypeProperties;
  value?: TypeValueType | TypeRepresenterValue;
  error?: TypeInputRepresenterError;
  onChange?: (value: any) => void;
  containerClassName?: string;
  errorClassName?: string;
};

const useInputRepresenter = ({
  properties,
  value,
  error,
  onChange,
  containerClassName,
  errorClassName,
}: TypeUseInputRepresenter) => {
  const handleChange = (event: { key: string; value: any }) => {
    const updatedValue: any = structuredClone(value);
    updatedValue[event.key] = event.value;
    onChange?.(updatedValue);
  };

  const hasCustomStyles = Boolean(containerClassName || errorClassName);

  return Object.entries(properties).map(([key, el]) => {
    const isObject = typeof value === "object" && !Array.isArray(value);
    if (isObject && el.renderCondition) {
      const { field } = el.renderCondition;
      const currentFieldValue = value[field];

      const checkValues = (key: "equals" | "notEquals", negate = false) => {
        if (!(key in (el.renderCondition as {}))) return false;
        const condition = (el.renderCondition as unknown as { equals: any; notEquals: any })[key];
        const match = Array.isArray(condition)
          ? condition.includes(currentFieldValue)
          : currentFieldValue === condition;
        return negate ? match : !match;
      };

      if (checkValues("notEquals", true) || checkValues("equals")) {
        return null;
      }
    }
    const _value = isObject ? (value[key] ?? value) : value;
    const _error = error?.[key];

    return (
      <div
        style={hasCustomStyles ? undefined : { position: "relative", width: "100%" }}
        className={containerClassName}
        key={key}
      >
        {types[el.type]({
          key,
          title: el.title,
          description: el.description!,
          //@ts-ignore
          value: _value,
          className: el.className,
          properties: el.properties,
          enum: el.enum ?? (el.items?.enum as any),
          minItems: el.minItems,
          maxItems: el.maxItems,
          items: el.items,
          onChange: (event) => handleChange(event),
          getOptions: el.getOptions as () => Promise<TypeLabeledValue[]>,
          loadMoreOptions: el.loadMoreOptions as () => Promise<TypeLabeledValue[]>,
          searchOptions: el.searchOptions as (value: string) => Promise<TypeLabeledValue[]>,
          totalOptionsLength: el.totalOptionsLength as number,
        })}
        {_error && (
          <Text
            className={errorClassName}
            style={
              hasCustomStyles
                ? undefined
                : {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }
            }
            size="xsmall"
            variant="danger"
          >
            {_error}
          </Text>
        )}
      </div>
    );
  });
};

export default useInputRepresenter;
