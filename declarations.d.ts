declare module "*.scss";
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.jpg";
declare module "*.png";
declare module "*.svg";
