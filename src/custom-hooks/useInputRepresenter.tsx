import { TypeCoordinates } from "components/atoms/map/Map";
import { Fragment, ReactNode } from "react";
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
import { isTypeSpicaLocation } from "utils/helper";
import ObjectInput from "components/atoms/inputs/normal/object/ObjectInput";
import ArrayInput from "components/atoms/inputs/normal/array/ArrayInput";

export type TypeProperties = {
  [key: string]: {
    type: keyof typeof types;
    key: string;
    title: string;
    description: string;
    options?: TypeOptions;
    enum?: (string | number)[];
    default?: boolean;
    items?: TypeMultipleItems | TypeArrayItems;
    minItems?: number;
    maxItems?: number;
    locationType?: string;
    className?: string;
    properties?: TypeProperties;
  };
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
  | "array";

type TypeOptions = {
  position: "top" | "bottom" | "left" | "right";
};

export type TypeSpicaLocation = { type: string; coordinates: [number, number] };

type TypeMultipleItems = {
  title?: string;
  type: "string" | "number";
  enum?: (number | string)[];
};

type TypeArrayItems = {
  title?: string;
  type: TypeInputType;
  properties: TypeProperties;
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
  properties?: TypeProperties;
  options?: any[];
  minItems?: number;
  maxItems?: number;
  items?: any;
  onChange?: ({ key, value }: TypeChangeEvent<T>) => void;
};

export type TypeInputTypeMap = {
  string: (props: TypeInputProps<string>) => ReactNode;
  number: (props: TypeInputProps<number>) => ReactNode;
  textarea: (props: TypeInputProps<string>) => ReactNode;
  date: (props: TypeInputProps<Date | string | null>) => ReactNode;
  boolean: (props: TypeInputProps<boolean>) => ReactNode;
  color: (props: TypeInputProps<string>) => ReactNode;
  storage: (props: TypeInputProps<string>) => ReactNode;
  multiselect: (props: TypeInputProps<(string | number)[]>) => ReactNode;
  location: (props: TypeInputProps<TypeCoordinates | TypeSpicaLocation>) => ReactNode;
  richtext: (props: TypeInputProps<string>) => ReactNode;
  object: (props: TypeInputProps<any>) => ReactNode;
  array: (props: TypeInputProps<any>) => ReactNode;
};

const types: TypeInputTypeMap = {
  string: (props) => (
    <StringInput
      label={props.title}
      description={props.description}
      inputContainerClassName={props.className}
      value={props.value}
      options={props.options}
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  number: (props) => (
    <NumberInput
      label={props.title}
      description={props.description}
      inputContainerClassName={props.className}
      value={props.value}
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
      onChange={(value) => props.onChange?.({ key: props.key, value })}
    />
  ),
  location: (props) => {
    if (isTypeSpicaLocation(props.value)) {
      const coordinates = props?.value.coordinates;
      props.value = { lat: coordinates[1], lng: coordinates[0] };
    }

    const handleChangeLocation = (value: TypeCoordinates) => {
      let normalizedValue: TypeSpicaLocation | TypeCoordinates = value;
      if (isTypeSpicaLocation(props.value)) {
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
        onChange={(value) => props.onChange?.({ key: props.key, value })}
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
      />
    );
  },
};

type TypeUseInputRepresenter = {
  properties: TypeProperties;
  value: {
    [key: string]: any;
  };
  onChange?: (event: TypeChangeEvent<unknown>) => void;
};

const useInputRepresenter = ({ properties, value, onChange }: TypeUseInputRepresenter) => {
  const handleChange = (event: TypeChangeEvent<unknown>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return Object.entries(properties).map(([key, el]) => {
    return (
      <Fragment key={key}>
        {types[el.type]({
          key: el.key,
          title: el.title,
          description: el.description,
          value: el.type === "object" ? value?.[key] : value,
          className: el.className,
          properties: el.properties,
          options: el.enum,
          minItems: el.minItems,
          maxItems: el.maxItems,
          items: el.items,
          onChange: handleChange,
        })}
      </Fragment>
    );
  });
};

export default useInputRepresenter;
