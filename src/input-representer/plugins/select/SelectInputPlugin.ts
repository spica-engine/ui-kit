import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { SelectInputRenderer } from "./SelectInputRenderer";

/**
 * Plugin for select inputs
 */
export class SelectInputPlugin extends BaseInputPlugin<string> {
  readonly type = "select" as const;
  readonly renderer = new SelectInputRenderer();
}
