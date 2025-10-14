import React from "react";
import { IErrorPresenter } from "../core/abstractions";
import { ValidationError } from "../types";
import Text from "../../components/atoms/text/Text";

/**
 * Handles error presentation
 * Implements Single Responsibility Principle
 */
export class ErrorPresenter implements IErrorPresenter {
  present(error: ValidationError | undefined, className?: string): React.ReactNode {
    if (!error || typeof error !== "string") {
      return null;
    }

    return (
      <Text
        className={className}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
        size="xsmall"
        variant="danger"
      >
        {error}
      </Text>
    );
  }

  getErrorForPath(error: ValidationError | undefined, path: string): string | undefined {
    if (!error) {
      return undefined;
    }

    if (typeof error === "string") {
      return error;
    }

    const parts = path.split(".");
    let current: ValidationError = error;

    for (const part of parts) {
      if (typeof current === "string") {
        return current;
      }
      current = current[part];
      if (!current) {
        return undefined;
      }
    }

    return typeof current === "string" ? current : undefined;
  }
}
