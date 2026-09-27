import { TypeFluidContainer } from "@atoms/fluid-container/FluidContainer";
import { TypeFlexElement } from "@atoms/flex-element/FlexElement";

export type TypeAccordionItem = {
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  // per-item overrides
  headingPadding?: string;
  bodyPadding?: string;
  borderBottom?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
};

export type TypeAccordionElement = {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  // existing optional
  icon?: React.ReactNode;
  bordered?: boolean;
  openClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  suffixOnHover?: boolean;
  noBackgroundOnFocus?: boolean;
  disableSuffixIcon?: boolean;
  disabled?: boolean;
  // new
  borderBottom?: boolean;
  headingPadding?: string;
  bodyPadding?: string;
  titleSize?: string;
  titleWeight?: number | string;
  chevronSize?: number;
  mountContent?: "always" | "lazy";
};

export type TypeAccordionGroup = TypeFlexElement & {
  items: TypeAccordionItem[];
  // existing
  defaultActiveIndex?: number;
  icon?: React.ReactNode;
  bordered?: boolean;
  header?: TypeFluidContainer;
  openClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  suffixOnHover?: boolean;
  noBackgroundOnFocus?: boolean;
  disableSuffixIcon?: boolean;
  // new
  multiOpen?: boolean;
  borderBottom?: boolean;
  headingPadding?: string;
  bodyPadding?: string;
  titleSize?: string;
  titleWeight?: number | string;
  chevronSize?: number;
  mountContent?: "always" | "lazy";
  gap?: number;
};
