import { useEffect, type RefObject } from "react";
import { isClickInsideAnyPortal } from "../components/atoms/portal/Portal";

type TypeUseOnClickOutside = {
  refs: RefObject<HTMLElement | null>[];
  onClickOutside: () => void;
};

export const useOnClickOutside = ({ refs, onClickOutside }: TypeUseOnClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const clickedInsideRefs = refs.some((ref) => ref.current?.contains(event.target as Node));

      if (!clickedInsideRefs && !isClickInsideAnyPortal(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, onClickOutside]);
};
