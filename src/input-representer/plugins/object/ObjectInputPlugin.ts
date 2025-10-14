import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { ObjectInputRenderer } from "./ObjectInputRenderer";
import { ObjectValue } from "../../types";

/**
 * Plugin for object inputs
 */
export class ObjectInputPlugin extends BaseInputPlugin<ObjectValue> {
  readonly type = "object" as const;
  readonly renderer = new ObjectInputRenderer();
}
