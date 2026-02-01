import { useCallback, useEffect, useRef, useState } from "react";
import { DragState, Bounds } from "./ColorPicker.types";

interface UseDragOptions {
  onDragStart?: (event: MouseEvent | TouchEvent) => void;
  onDrag?: (x: number, y: number, bounds: Bounds) => void;
  onDragEnd?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  preventSelection?: boolean;
}

export const useDrag = (options: UseDragOptions = {}) => {
  const { onDragStart, onDrag, onDragEnd, onKeyDown, preventSelection = true } = options;

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  const elementRef = useRef<HTMLElement>(null);
  const boundsRef = useRef<Bounds>({ left: 0, top: 0, width: 0, height: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const lastCallTimeRef = useRef<number>(0);

  // Update bounds when element changes or window resizes
  const updateBounds = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      boundsRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    }
  }, []);

  // Get pointer position from event
  const getEventPosition = useCallback((event: MouseEvent | TouchEvent) => {
    if ("touches" in event) {
      const touch = event.touches[0] || event.changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: event.clientX, y: event.clientY };
  }, []);

  // Calculate relative position within bounds
  const getRelativePosition = useCallback((clientX: number, clientY: number) => {
    const bounds = boundsRef.current;
    const x = (clientX - bounds.left) / bounds.width;
    const y = (clientY - bounds.top) / bounds.height;

    return {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
    };
  }, []);

  // Throttled drag handler using RAF
  const handleDragThrottled = useCallback(
    (clientX: number, clientY: number) => {
      const now = performance.now();

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (now - lastCallTimeRef.current >= 16) {
          // ~60fps
          const { x, y } = getRelativePosition(clientX, clientY);
          onDrag?.(x, y, boundsRef.current);
          lastCallTimeRef.current = now;
        }
      });
    },
    [getRelativePosition, onDrag]
  );

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      updateBounds();

      const { x, y } = getEventPosition(event);

      setDragState({
        isDragging: true,
        startX: x,
        startY: y,
        currentX: x,
        currentY: y,
      });

      onDragStart?.(event);
      handleDragThrottled(x, y);

      if (preventSelection) {
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
      }
    },
    [getEventPosition, handleDragThrottled, onDragStart, preventSelection, updateBounds]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!dragState.isDragging) return;

      event.preventDefault();
      const { x, y } = getEventPosition(event);

      setDragState((prev) => ({
        ...prev,
        currentX: x,
        currentY: y,
      }));

      handleDragThrottled(x, y);
    },
    [dragState.isDragging, getEventPosition, handleDragThrottled]
  );

  const handleMouseUp = useCallback(() => {
    if (!dragState.isDragging) return;

    setDragState((prev) => ({ ...prev, isDragging: false }));
    onDragEnd?.();

    if (preventSelection) {
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    }

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }, [dragState.isDragging, onDragEnd, preventSelection]);

  // Touch event handlers
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      updateBounds();

      const { x, y } = getEventPosition(event);

      setDragState({
        isDragging: true,
        startX: x,
        startY: y,
        currentX: x,
        currentY: y,
      });

      onDragStart?.(event);
      handleDragThrottled(x, y);
    },
    [getEventPosition, handleDragThrottled, onDragStart, updateBounds]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!dragState.isDragging) return;

      event.preventDefault();
      const { x, y } = getEventPosition(event);

      setDragState((prev) => ({
        ...prev,
        currentX: x,
        currentY: y,
      }));

      handleDragThrottled(x, y);
    },
    [dragState.isDragging, getEventPosition, handleDragThrottled]
  );

  const handleTouchEnd = useCallback(() => {
    if (!dragState.isDragging) return;

    setDragState((prev) => ({ ...prev, isDragging: false }));
    onDragEnd?.();

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }, [dragState.isDragging, onDragEnd]);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      onKeyDown?.(event);
    },
    [onKeyDown]
  );

  // Window resize handler
  const handleResize = useCallback(() => {
    updateBounds();
  }, [updateBounds]);

  // Set up event listeners
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Mouse events
    element.addEventListener("mousedown", handleMouseDown);

    // Touch events
    element.addEventListener("touchstart", handleTouchStart, { passive: false });

    // Keyboard events
    element.addEventListener("keydown", handleKeyDown);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleMouseDown, handleTouchStart, handleKeyDown]);

  // Global mouse/touch move and up events
  useEffect(() => {
    if (!dragState.isDragging) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragState.isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Window resize listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    elementRef,
    dragState,
    updateBounds,
  };
};
