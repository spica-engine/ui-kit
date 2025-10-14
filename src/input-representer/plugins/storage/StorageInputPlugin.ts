import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { StorageInputRenderer } from "./StorageInputRenderer";

/**
 * Plugin for storage inputs
 */
export class StorageInputPlugin extends BaseInputPlugin<string> {
  readonly type = "storage" as const;
  readonly renderer = new StorageInputRenderer();
}
