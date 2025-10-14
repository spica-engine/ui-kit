import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { MultiSelectInputRenderer } from "./MultiSelectInputRenderer";

/**
 * Plugin for multiselect inputs
 */
export class MultiSelectInputPlugin extends BaseInputPlugin<(string | number)[]> {
  readonly type = "multiselect" as const;
  readonly renderer = new MultiSelectInputRenderer();
}
