import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { TextAreaInputRenderer } from "./TextAreaInputRenderer";

/**
 * Plugin for textarea inputs
 */
export class TextAreaInputPlugin extends BaseInputPlugin<string> {
  readonly type = "textarea" as const;
  readonly renderer = new TextAreaInputRenderer();
}
