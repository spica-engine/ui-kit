import { useEffect, type RefObject } from "react";

type ElementType = HTMLElement | null;
type TargetElement = RefObject<ElementType> | ElementType;

type TypeUseOnClickOutside = {
  targetElements: (TargetElement | undefined)[];
  onClickOutside: (event?: MouseEvent) => void;
};

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
