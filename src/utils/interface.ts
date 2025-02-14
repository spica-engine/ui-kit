export type TypeDimension = number | "fill" | "hug";
export type TypeAlignment =
  | "leftTop"
  | "top"
  | "rightTop"
  | "leftCenter"
  | "center"
  | "rightCenter"
  | "leftBottom"
  | "bottom"
  | "rightBottom";

export type TypeDirection = "vertical" | "horizontal" | "wrap";

export type TypeFlexContainer = {
  alignment?: TypeAlignment;
  direction?: TypeDirection;
  gap?: number;
};

export type TypeFlexDimension = {
  dimensionX?: TypeDimension;
  dimensionY?: TypeDimension;
};

export type TypeFile = {
  _id: string;
  name: string;
  content: {
    type: string;
    size: number;
  };
  url: string;
};

export type TypeInput = React.InputHTMLAttributes<HTMLInputElement>;
export type TypeDiv = React.HTMLAttributes<HTMLDivElement>;
