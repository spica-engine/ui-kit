/**
 * Legacy hook wrapper for backward compatibility
 * Converts old API to new API seamlessly
 */

import React from "react";
import { useInputRepresenter as useNewInputRepresenter } from "../hooks/useInputRepresenter";
import {
  TypeProperties,
  TypeInputRepresenterError,
  convertLegacyProperties,
  convertLegacyError,
  convertLegacyValue,
} from "./LegacyTypeAdapter";

interface UseLegacyInputRepresenterProps {
  properties: TypeProperties;
  value?: any;
  error?: TypeInputRepresenterError;
  onChange?: (value: any) => void;
  containerClassName?: string;
  errorClassName?: string;
}

/**
 * Drop-in replacement for the old useInputRepresenter
 * Uses new architecture under the hood
 */
export const useLegacyInputRepresenter = ({
  properties,
  value,
  error,
  onChange,
  containerClassName,
  errorClassName,
}: UseLegacyInputRepresenterProps) => {
  // Convert legacy types to new types
  const newProperties = React.useMemo(() => convertLegacyProperties(properties), [properties]);
  const newError = React.useMemo(() => convertLegacyError(error), [error]);
  const newValue = React.useMemo(() => convertLegacyValue(value), [value]);

  return useNewInputRepresenter({
    properties: newProperties,
    value: newValue,
    error: newError,
    onChange,
    containerClassName,
    errorClassName,
  });
};
