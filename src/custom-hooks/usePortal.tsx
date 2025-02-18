import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

type TypePortalLayer = {
  portalId: string;
  children: ReactNode;
};

type TypePortalContextType = {
  openLayer: (portalId: string, children: ReactNode) => void;
  closeLayer: (portalId: string) => void;
};

const PortalContext = createContext<TypePortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portalLayers, setPortalLayers] = useState<TypePortalLayer[]>([]);

  const handlePortalCreation = (portalId: string) => {
    let portalNode = document.getElementById(portalId);
    if (!portalNode) {
      portalNode = document.createElement("div");
      portalNode.id = portalId;
      document.body.appendChild(portalNode);
    }
    return portalNode;
  };

  const openLayer = (portalId: string, children: ReactNode) => {
    handlePortalCreation(portalId);
    setPortalLayers((prev) => [...prev, { portalId, children }]);
  };

  const closeLayer = (portalId: string) => {
    setPortalLayers((prev) => prev.filter((layer) => layer.portalId !== portalId));
  };

  return (
    <PortalContext.Provider value={{ openLayer, closeLayer }}>
      {children}
      {portalLayers.map(({ portalId, children }) =>
        ReactDOM.createPortal(children, handlePortalCreation(portalId))
      )}
    </PortalContext.Provider>
  );
};

export const usePortal = (): TypePortalContextType => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
};

export const withPortalProvider = (Component: React.FC<any>) => {
  return (props: React.PropsWithChildren<{}>) => {
    return (
      <PortalProvider>
        <Component {...props} />
      </PortalProvider>
    );
  };
};
