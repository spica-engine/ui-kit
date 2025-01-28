import { useState, useCallback, RefObject } from "react";

type Placement =
  | "topStart"
  | "top"
  | "topEnd"
  | "rightStart"
  | "right"
  | "rightEnd"
  | "bottomStart"
  | "bottom"
  | "bottomEnd"
  | "leftStart"
  | "left"
  | "leftEnd";

type AdaptivePositionProps = {
  containerRef: RefObject<HTMLElement | null>;
  targetRef: RefObject<HTMLElement | null>;
  initialPlacement?: Placement;
};

type PositionStyle = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

const useAdaptivePosition = ({
  containerRef,
  targetRef,
  initialPlacement = "bottom",
}: AdaptivePositionProps) => {
  const [targetPosition, setTargetPosition] = useState<PositionStyle | null>(null);

  const calculatePosition = useCallback(() => {
    if (!containerRef.current || !targetRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const targetHeight = targetRef.current.offsetHeight;
    const targetWidth = targetRef.current.offsetWidth;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const placements: Record<Placement, PositionStyle> = {
      topStart: {
        top: rect.top - targetHeight + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.top + window.scrollY,
        right: rect.left + targetWidth + window.scrollX,
      },
      top: {
        top: rect.top - targetHeight + window.scrollY,
        left: rect.left + rect.width / 2 - targetWidth / 2 + window.scrollX,
        bottom: rect.top + window.scrollY,
        right: rect.left + rect.width / 2 + targetWidth / 2 + window.scrollX,
      },
      topEnd: {
        top: rect.top - targetHeight + window.scrollY,
        left: rect.right - targetWidth + window.scrollX,
        bottom: rect.top + window.scrollY,
        right: rect.right + window.scrollX,
      },
      rightStart: {
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX,
        bottom: rect.top + targetHeight + window.scrollY,
        right: rect.right + targetWidth + window.scrollX,
      },
      right: {
        top: rect.top + rect.height / 2 - targetHeight / 2 + window.scrollY,
        left: rect.right + window.scrollX,
        bottom: rect.top + rect.height / 2 + targetHeight / 2 + window.scrollY,
        right: rect.right + targetWidth + window.scrollX,
      },
      rightEnd: {
        top: rect.bottom - targetHeight + window.scrollY,
        left: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + targetWidth + window.scrollX,
      },
      bottomStart: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + targetHeight + window.scrollY,
        right: rect.left + targetWidth + window.scrollX,
      },
      bottom: {
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2 - targetWidth / 2 + window.scrollX,
        bottom: rect.bottom + targetHeight + window.scrollY,
        right: rect.left + rect.width / 2 + targetWidth / 2 + window.scrollX,
      },
      bottomEnd: {
        top: rect.bottom + window.scrollY,
        left: rect.right - targetWidth + window.scrollX,
        bottom: rect.bottom + targetHeight + window.scrollY,
        right: rect.right + window.scrollX,
      },
      leftStart: {
        top: rect.top + window.scrollY,
        left: rect.left - targetWidth + window.scrollX,
        bottom: rect.top + targetHeight + window.scrollY,
        right: rect.left + window.scrollX,
      },
      left: {
        top: rect.top + rect.height / 2 - targetHeight / 2 + window.scrollY,
        left: rect.left - targetWidth + window.scrollX,
        bottom: rect.top + rect.height / 2 + targetHeight / 2 + window.scrollY,
        right: rect.left + window.scrollX,
      },
      leftEnd: {
        top: rect.bottom - targetHeight + window.scrollY,
        left: rect.left - targetWidth + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.left + window.scrollX,
      },
    };

    const checkPositionFit = (position: PositionStyle): boolean => {
      const { top, left, bottom, right } = position;
      const fitsVertically =
        (top === undefined || top >= 0) && (bottom === undefined || bottom <= viewportHeight);

      const fitsHorizontally =
        (left === undefined || left >= 0) && (right === undefined || right <= viewportWidth);

      return fitsVertically && fitsHorizontally;
    };

    const getBestPlacement = (): Placement => {
      const alternativePlacements: Record<Placement, Placement[]> = {
        top: ["bottom", "bottomStart", "bottomEnd", "right", "left", "leftStart", "leftEnd"],
        bottom: ["top", "topStart", "topEnd", "right", "left", "leftStart", "leftEnd"],
        left: ["right", "rightStart", "rightEnd", "top", "bottom", "topStart", "topEnd"],
        right: ["left", "leftStart", "leftEnd", "top", "bottom", "topStart", "topEnd"],
        topStart: ["bottomStart", "bottom", "bottomEnd", "right", "left"],
        topEnd: ["bottomStart", "bottom", "bottomEnd", "right", "left"],
        rightStart: ["leftStart", "left", "leftEnd", "top", "bottom"],
        rightEnd: ["leftStart", "left", "leftEnd", "top", "bottom"],
        bottomStart: ["topStart", "top", "topEnd", "right", "left"],
        bottomEnd: ["topStart", "top", "topEnd", "right", "left"],
        leftStart: ["rightStart", "right", "rightEnd", "top", "bottom"],
        leftEnd: ["rightStart", "right", "rightEnd", "top", "bottom"],
      };

      if (checkPositionFit(placements[initialPlacement])) {
        return initialPlacement;
      }

      if (initialPlacement === "bottom" && !checkPositionFit(placements.bottom)) {
        if (checkPositionFit(placements.top)) {
          return "top";
        }
      }

      const alternatives = alternativePlacements[initialPlacement];

      for (let placement of alternatives) {
        if (checkPositionFit(placements[placement])) {
          return placement;
        }
      }

      return initialPlacement;
    };

    const bestPlacement = getBestPlacement();
    setTargetPosition(placements[bestPlacement]);
  }, [containerRef, targetRef, initialPlacement]);

  return { targetPosition, calculatePosition };
};

export default useAdaptivePosition;
