import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  type FC,
  type ReactNode,
  type RefObject,
} from "react";

type LayerEntry = {
  id: number;
  refs: RefObject<HTMLElement | null>[];
  onClickOutside: (event: MouseEvent) => void;
};

type LayerManagerContextValue = {
  register: (entry: LayerEntry) => void;
  unregister: (id: number) => void;
  nextId: () => number;
};

const LayerManagerContext = createContext<LayerManagerContextValue | null>(null);

function createLayerManager(): LayerManagerContextValue & {
  attach: () => void;
  detach: () => void;
} {
  let counter = 0;
  const stack: LayerEntry[] = [];

  const handleMouseDown = (event: MouseEvent) => {
    if (!event.target) return;
    const target = event.target as Node;

    // Walk from topmost layer down
    for (let i = stack.length - 1; i >= 0; i--) {
      const layer = stack[i];
      const clickedInside = layer.refs.some((ref) => ref.current?.contains(target));

      if (clickedInside) {
        // Click is inside this layer — stop, nothing should close
        return;
      }

      // Click is outside this (topmost unmatched) layer — close it and stop
      layer.onClickOutside(event);
      return;
    }
  };

  return {
    register(entry: LayerEntry) {
      stack.push(entry);
    },
    unregister(id: number) {
      const idx = stack.findIndex((e) => e.id === id);
      if (idx !== -1) stack.splice(idx, 1);
    },
    nextId() {
      return ++counter;
    },
    attach() {
      document.addEventListener("mousedown", handleMouseDown);
    },
    detach() {
      document.removeEventListener("mousedown", handleMouseDown);
    },
  };
}

// Singleton fallback for when no provider is in the tree
let singletonManager: ReturnType<typeof createLayerManager> | null = null;

function getSingletonManager() {
  if (!singletonManager) {
    singletonManager = createLayerManager();
    singletonManager.attach();
  }
  return singletonManager;
}

export const LayerManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const managerRef = useRef<ReturnType<typeof createLayerManager> | null>(null);

  if (!managerRef.current) {
    managerRef.current = createLayerManager();
  }

  const manager = managerRef.current;

  useEffect(() => {
    manager.attach();
    return () => manager.detach();
  }, [manager]);

  const value: LayerManagerContextValue = {
    register: manager.register,
    unregister: manager.unregister,
    nextId: manager.nextId,
  };

  return <LayerManagerContext.Provider value={value}>{children}</LayerManagerContext.Provider>;
};

function useLayerManager(): LayerManagerContextValue {
  const ctx = useContext(LayerManagerContext);
  if (ctx) return ctx;
  // Fallback to singleton so consumers don't need to wrap in a provider
  return getSingletonManager();
}

export function useLayer(
  refs: RefObject<HTMLElement | null>[],
  onClickOutside?: (event: MouseEvent) => void,
  enabled: boolean = true
) {
  const manager = useLayerManager();
  const idRef = useRef<number | null>(null);
  const callbackRef = useRef(onClickOutside);
  callbackRef.current = onClickOutside;

  const stableCallback = useCallback((event: MouseEvent) => {
    callbackRef.current?.(event);
  }, []);

  useEffect(() => {
    if (!enabled || !onClickOutside) {
      // If disabled or no callback, ensure we're unregistered
      if (idRef.current !== null) {
        manager.unregister(idRef.current);
        idRef.current = null;
      }
      return;
    }

    const id = manager.nextId();
    idRef.current = id;
    manager.register({ id, refs, onClickOutside: stableCallback });

    return () => {
      manager.unregister(id);
      idRef.current = null;
    };
  }, [enabled, manager, stableCallback, ...refs]); // eslint-disable-line react-hooks/exhaustive-deps
}
