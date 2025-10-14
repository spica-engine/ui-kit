import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { StringInputRenderer } from "./StringInputRenderer";

/**
 * Plugin for string inputs
 */
export class StringInputPlugin extends BaseInputPlugin<string> {
  readonly type = "string" as const;
  readonly renderer = new StringInputRenderer();
}
