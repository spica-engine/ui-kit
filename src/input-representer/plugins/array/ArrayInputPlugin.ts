import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { ArrayInputRenderer } from "./ArrayInputRenderer";
import { ArrayValue } from "../../types";

/**
 * Plugin for array inputs
 */
export class ArrayInputPlugin extends BaseInputPlugin<ArrayValue> {
  readonly type = "array" as const;
  readonly renderer = new ArrayInputRenderer();
}
