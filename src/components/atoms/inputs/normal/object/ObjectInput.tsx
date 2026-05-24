import React, { FC, memo, useCallback, useState, ReactElement } from "react";
import styles from "./ObjectInput.module.scss";
import {
  TypeInputRepresenterError,
  TypeProperties,
  TypeRepresenterValue,
} from "@custom-hooks/useInputRepresenter";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import { TypeText } from "@atoms/text/Text";

export type TypeObjectInput = {
  value?: TypeRepresenterValue;
  properties: TypeProperties;
  title?: string;
  description?: string;
  errorMessage?: string;
  helperTextContainerProps?: TypeFlexElement;
  helperTextProps?: TypeText;
  onChange?: (value: any) => void;
  errors?: TypeInputRepresenterError;
  className?: string;
};

// ── Type → colored SVG icon ────────────────────────────────────────────────
const TYPE_ICONS: Record<string, ReactElement> = {
  string: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-blue)", flexShrink: 0 }}>
      <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  number: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-green)", flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
    </svg>
  ),
  date: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-amber)", flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  boolean: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "#8b5cf6", flexShrink: 0 }}>
      <rect x="1" y="5" width="22" height="14" rx="7" /><circle cx="16" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  textarea: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-text-muted)", flexShrink: 0 }}>
      <line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  ),
  multiselect: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-accent)", flexShrink: 0 }}>
      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  relation: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-red)", flexShrink: 0 }}>
      <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <line x1="6" y1="9" x2="6" y2="15" /><path d="M18 15V9a3 3 0 0 0-3-3H9" />
    </svg>
  ),
  array: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-accent)", flexShrink: 0 }}>
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  object: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-text-muted)", flexShrink: 0 }}>
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  storage: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-amber)", flexShrink: 0 }}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  richtext: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-blue)", flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
    </svg>
  ),
  color: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-green)", flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" />
    </svg>
  ),
  json: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-text-muted)", flexShrink: 0 }}>
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  chip: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-accent)", flexShrink: 0 }}>
      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  select: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-accent)", flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  location: (
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-red)", flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

const BADGE_CLASSES: Record<string, string> = {
  string: styles.badgeString,
  number: styles.badgeNumber,
  date: styles.badgeDate,
  boolean: styles.badgeBoolean,
  relation: styles.badgeRelation,
  multiselect: styles.badgeMultiselect,
  array: styles.badgeArray,
  chip: styles.badgeChip,
  select: styles.badgeSelect,
  richtext: styles.badgeRichtext,
  storage: styles.badgeStorage,
  color: styles.badgeColor,
  location: styles.badgeLocation,
};

function getTypeIcon(type: string): ReactElement {
  return TYPE_ICONS[type] ?? TYPE_ICONS.object;
}

function getBadgeClass(type: string): string {
  return BADGE_CLASSES[type] ?? "";
}

const ObjectInput: FC<TypeObjectInput> = ({
  value,
  properties,
  title,
  onChange,
  errors,
  className,
}) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (key: string, newVal: any) => {
      const updated = { ...(value as Record<string, any>), [key]: newVal };
      onChange?.(updated);
    },
    [value, onChange]
  );

  const isObj = typeof value === "object" && !Array.isArray(value);

  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      <div className={styles.fieldHead}>
        <div className={styles.fieldName}>
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {title ?? "Object"}
        </div>
        <span className={styles.fieldType}>object</span>
      </div>

      <div className={styles.object}>
        {Object.entries(properties ?? {}).map(([key, el]) => {
          const fieldVal = isObj ? (value as Record<string, any>)?.[key] : undefined;
          const isNumber = el.type === "number";
          const isBoolean = el.type === "boolean";
          const isRelation = el.type === "relation";
          const isDate = el.type === "date";
          const isNestedObject = el.type === "object";

          if (isNestedObject) {
            const isCollapsed = !!collapsed[key];
            return (
              <div className={styles.nestedBlock} key={key}>
                <div className={styles.nestedHead}>
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-text-muted)", flexShrink: 0 }}>
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                  <span className={styles.nestedName}>{el.title}</span>
                  <span className={styles.ofBadge}>object</span>
                  <button
                    className={`${styles.nestedToggle} ${isCollapsed ? styles.nestedToggleCollapsed : ""}`}
                    onClick={() => setCollapsed(s => ({ ...s, [key]: !s[key] }))}
                    type="button"
                    aria-expanded={!isCollapsed}
                  >
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
                {!isCollapsed && (
                  <div className={styles.nestedBody}>
                    {Object.entries(el.properties ?? {}).map(([nestedKey, nestedEl]) => {
                      const nestedVal = isObj && typeof fieldVal === "object" && fieldVal !== null
                        ? (fieldVal as Record<string, any>)[nestedKey]
                        : undefined;
                      const nestedIsNumber = nestedEl.type === "number";
                      const nestedIsBoolean = nestedEl.type === "boolean";
                      return (
                        <div className={styles.objRow} key={nestedKey}>
                          <div className={styles.objKey}>
                            {getTypeIcon(nestedEl.type)}
                            <span>{nestedEl.title}</span>
                            <span className={`${styles.ofBadge} ${getBadgeClass(nestedEl.type)}`}>{nestedEl.type}</span>
                          </div>
                          <div className={styles.objVal}>
                            {nestedIsBoolean ? (
                              <div
                                className={`${styles.toggle} ${nestedVal ? styles.toggleOn : ""}`}
                                onClick={() => handleChange(key, { ...(fieldVal as Record<string, any>), [nestedKey]: !nestedVal })}
                                role="switch"
                                aria-checked={Boolean(nestedVal)}
                              />
                            ) : (
                              <input
                                className={styles.valInput}
                                type={nestedIsNumber ? "number" : "text"}
                                placeholder={nestedEl.placeholder ?? (nestedIsNumber ? "0" : `${nestedEl.type} value\u2026`)}
                                value={nestedVal !== undefined && nestedVal !== null ? String(nestedVal) : ""}
                                onChange={(e) => {
                                  const raw = e.target.value;
                                  handleChange(key, {
                                    ...(fieldVal as Record<string, any>),
                                    [nestedKey]: nestedIsNumber ? (raw === "" ? undefined : Number(raw)) : raw,
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className={styles.objRow} key={key}>
              <div className={styles.objKey}>
                {getTypeIcon(el.type)}
                <span>{el.title}</span>
                <span className={`${styles.ofBadge} ${getBadgeClass(el.type)}`}>{el.type}</span>
              </div>
              <div className={styles.objVal}>
                {isBoolean ? (
                  <div
                    className={`${styles.toggle} ${fieldVal ? styles.toggleOn : ""}`}
                    onClick={() => handleChange(key, !fieldVal)}
                    role="switch"
                    aria-checked={Boolean(fieldVal)}
                  />
                ) : isRelation ? (
                  <span className={styles.relationTrigger}>
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {fieldVal ? String(fieldVal) : "Select\u2026"}
                  </span>
                ) : (
                  <input
                    className={styles.valInput}
                    type={isDate ? "datetime-local" : isNumber ? "number" : "text"}
                    placeholder={el.placeholder ?? (isNumber ? "0" : `${el.type} value\u2026`)}
                    value={fieldVal !== undefined && fieldVal !== null ? String(fieldVal) : ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      handleChange(key, isNumber ? (raw === "" ? undefined : Number(raw)) : raw);
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ObjectInput);

