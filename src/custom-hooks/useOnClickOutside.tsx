import { useEffect, type RefObject } from "react";

/** @deprecated No longer needed — Portal/Popover/Select use LayerManager now. Kept for backward compatibility. */
export const handledClickOutsideEvents = new WeakSet<Event>();

type ElementType = HTMLElement | null;
type TargetElement = RefObject<ElementType> | ElementType;

type TypeUseOnClickOutside = {
  targetElements: (TargetElement | undefined)[];
  onClickOutside: (event?: MouseEvent) => void;
};

/**
 * For non-portal inline components (e.g. Autocomplete).
 * Portal-based components should use `useLayer` from LayerManager instead.
 */
export const useOnClickOutside = ({ targetElements, onClickOutside }: TypeUseOnClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;

      const clickedInsideRefs = targetElements.some((targetElement) => {
        if (targetElement instanceof HTMLElement) {
          return targetElement.contains?.(event.target as Node);
        }
        return targetElement?.current?.contains?.(event.target as Node);
      });

      if (clickedInsideRefs) return;
      onClickOutside(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [targetElements, onClickOutside]);
};
