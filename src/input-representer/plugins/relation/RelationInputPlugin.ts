import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { RelationInputRenderer } from "./RelationInputRenderer";
import { TypeLabeledValue } from "../../../index.export";

/**
 * Plugin for relation inputs
 */
export class RelationInputPlugin extends BaseInputPlugin<TypeLabeledValue | TypeLabeledValue[]> {
  readonly type = "relation" as const;
  readonly renderer = new RelationInputRenderer();
}
