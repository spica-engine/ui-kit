import React, { useState, ReactNode, useEffect, FC } from "react";
import ReactDOM from "react-dom";

type TypePortalProps = {
  children: ReactNode;
};

const Portal: FC<TypePortalProps> = ({ children }) => {
  return ReactDOM.createPortal(<div>{children}</div>, document.body);
};

export default Portal;
