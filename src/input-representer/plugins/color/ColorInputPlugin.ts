import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { ColorInputRenderer } from "./ColorInputRenderer";

/**
 * Plugin for color inputs
 */
export class ColorInputPlugin extends BaseInputPlugin<string> {
  readonly type = "color" as const;
  readonly renderer = new ColorInputRenderer();
}
