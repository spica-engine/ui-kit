import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { RichTextInputRenderer } from "./RichTextInputRenderer";

/**
 * Plugin for richtext inputs
 */
export class RichTextInputPlugin extends BaseInputPlugin<string> {
  readonly type = "richtext" as const;
  readonly renderer = new RichTextInputRenderer();
}
