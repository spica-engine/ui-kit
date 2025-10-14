import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { DateInputRenderer } from "./DateInputRenderer";

/**
 * Plugin for date inputs
 */
export class DateInputPlugin extends BaseInputPlugin<Date | string | null> {
  readonly type = "date" as const;
  readonly renderer = new DateInputRenderer();
}
