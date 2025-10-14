// Export all plugins
export * from "./string/StringInputPlugin";
export * from "./number/NumberInputPlugin";
export * from "./textarea/TextAreaInputPlugin";
export * from "./date/DateInputPlugin";
export * from "./boolean/BooleanInputPlugin";
export * from "./color/ColorInputPlugin";
export * from "./storage/StorageInputPlugin";
export * from "./multiselect/MultiSelectInputPlugin";
export * from "./location/LocationInputPlugin";
export * from "./richtext/RichTextInputPlugin";
export * from "./object/ObjectInputPlugin";
export * from "./array/ArrayInputPlugin";
export * from "./chip/ChipInputPlugin";
export * from "./relation/RelationInputPlugin";
export * from "./select/SelectInputPlugin";

// Export function to get all default plugins
import { StringInputPlugin } from "./string/StringInputPlugin";
import { NumberInputPlugin } from "./number/NumberInputPlugin";
import { TextAreaInputPlugin } from "./textarea/TextAreaInputPlugin";
import { DateInputPlugin } from "./date/DateInputPlugin";
import { BooleanInputPlugin } from "./boolean/BooleanInputPlugin";
import { ColorInputPlugin } from "./color/ColorInputPlugin";
import { StorageInputPlugin } from "./storage/StorageInputPlugin";
import { MultiSelectInputPlugin } from "./multiselect/MultiSelectInputPlugin";
import { LocationInputPlugin } from "./location/LocationInputPlugin";
import { RichTextInputPlugin } from "./richtext/RichTextInputPlugin";
import { ObjectInputPlugin } from "./object/ObjectInputPlugin";
import { ArrayInputPlugin } from "./array/ArrayInputPlugin";
import { ChipInputPlugin } from "./chip/ChipInputPlugin";
import { RelationInputPlugin } from "./relation/RelationInputPlugin";
import { SelectInputPlugin } from "./select/SelectInputPlugin";
import { InputPlugin } from "../core/plugin/InputPlugin";
import { InputValue } from "../types";

export function getDefaultPlugins(): InputPlugin<InputValue>[] {
  return [
    new StringInputPlugin(),
    new NumberInputPlugin(),
    new TextAreaInputPlugin(),
    new DateInputPlugin(),
    new BooleanInputPlugin(),
    new ColorInputPlugin(),
    new StorageInputPlugin(),
    new MultiSelectInputPlugin(),
    new LocationInputPlugin(),
    new RichTextInputPlugin(),
    new ObjectInputPlugin(),
    new ArrayInputPlugin(),
    new ChipInputPlugin(),
    new RelationInputPlugin(),
    new SelectInputPlugin(),
  ];
}
