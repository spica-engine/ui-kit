import { BaseInputPlugin } from "../../core/plugin/InputPlugin";
import { LocationInputRenderer } from "./LocationInputRenderer";
import { TypeCoordinates } from "../../../components/atoms/map/Map";
import { utils } from "utils";

/**
 * Plugin for location inputs
 */
export class LocationInputPlugin extends BaseInputPlugin<TypeCoordinates | utils.api.TypeLocation> {
  readonly type = "location" as const;
  readonly renderer = new LocationInputRenderer();
}
