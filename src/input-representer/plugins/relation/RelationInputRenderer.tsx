import React from "react";
import { BaseRenderer } from "../base/BaseRenderer";
import { RelationInputProps, InputConfig } from "../../types";
import RelationInput from "../../../components/atoms/relation-input/RelationInput";
import { TypeLabeledValue } from "../../../index.export";
import { TypeRelationSelect } from "../../../components/atoms/relation-input/relation-select/RelationSelect";

/**
 * Renderer for relation inputs
 */
export class RelationInputRenderer extends BaseRenderer<
  TypeLabeledValue | TypeLabeledValue[],
  RelationInputProps
> {
  render(props: RelationInputProps): React.ReactNode {
    return (
      <RelationInput
        value={props.value}
        onChange={(value) => props.onChange?.({ key: props.key, value })}
        label={props.title}
        getOptions={props.getOptions}
        loadMoreOptions={props.loadMoreOptions}
        searchOptions={props.searchOptions}
        totalOptionsLength={props.totalOptionsLength}
        multiple={props.relationType === "onetomany"}
        selectProps={{ popupClassName: props.popupClassName || "" } as TypeRelationSelect}
      />
    );
  }

  protected extendProps(baseProps: RelationInputProps, config: InputConfig): RelationInputProps {
    if (!("getOptions" in config) || !config.getOptions) {
      throw new Error("RelationInput requires getOptions, loadMoreOptions, and searchOptions");
    }

    return {
      ...baseProps,
      getOptions: config.getOptions,
      loadMoreOptions: config.loadMoreOptions!,
      searchOptions: config.searchOptions!,
      totalOptionsLength: config.totalOptionsLength!,
      relationType: "relationType" in config ? config.relationType : undefined,
      popupClassName: "popupClassName" in config ? config.popupClassName : undefined,
    };
  }
}
