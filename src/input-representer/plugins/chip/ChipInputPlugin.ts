import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { ChipInputRenderer } from "./ChipInputRenderer";

/**
 * Plugin for chip inputs
 */
export class ChipInputPlugin extends BaseInputPlugin<string[] | number[]> {
  readonly type = "chip" as const;
  readonly renderer = new ChipInputRenderer();
}
