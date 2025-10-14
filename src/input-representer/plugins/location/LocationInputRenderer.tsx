import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { LocationInputProps, InputConfig } from "../../types";
import LocationInput from "../../../components/atoms/inputs/normal/location/Location";
import { TypeCoordinates } from "../../../components/atoms/map/Map";
import { utils } from "utils";

/**
 * Renderer for location inputs
 */
export class LocationInputRenderer extends BaseRenderer<
  TypeCoordinates | utils.api.TypeLocation,
  LocationInputProps
> {
  render(props: LocationInputProps): React.ReactNode {
    let coordinates = props.value as TypeCoordinates;

    if (props.value && utils.api.isTypeLocation(props.value)) {
      const locationValue = props.value as utils.api.TypeLocation;
      coordinates = { lat: locationValue.coordinates[1], lng: locationValue.coordinates[0] };
    }

    const handleChangeLocation = (value: TypeCoordinates) => {
      let normalizedValue: utils.api.TypeLocation | TypeCoordinates = value;
      if (props.value && utils.api.isTypeLocation(props.value)) {
        normalizedValue = {
          type: "Point",
          coordinates: [value.lng, value.lat],
        };
      }
      props.onChange?.({ key: props.key, value: normalizedValue });
    };

    return (
      <LocationInput
        title={props.title}
        dimensionX="fill"
        coordinates={coordinates}
        onChange={handleChangeLocation}
        className={props.className}
      />
    );
  }
}
