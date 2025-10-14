import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { BooleanInputRenderer } from "./BooleanInputRenderer";

/**
 * Plugin for boolean inputs
 */
export class BooleanInputPlugin extends BaseInputPlugin<boolean> {
  readonly type = "boolean" as const;
  readonly renderer = new BooleanInputRenderer();
}
