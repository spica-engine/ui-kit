import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { NumberInputRenderer } from "./NumberInputRenderer";

/**
 * Plugin for number inputs
 */
export class NumberInputPlugin extends BaseInputPlugin<number> {
  readonly type = "number" as const;
  readonly renderer = new NumberInputRenderer();
}
