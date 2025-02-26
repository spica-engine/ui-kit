import React, { ReactNode, FC, useEffect } from "react";
import ReactDOM from "react-dom";

type TypePortalProps = {
  children: ReactNode;
};

const Portal: FC<TypePortalProps> = ({ children }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  return ReactDOM.createPortal(<div>{children}</div>, document.body);
};

export default Portal;
