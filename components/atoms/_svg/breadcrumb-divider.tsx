import type { SVGProps } from "./svg";

const BreadcrumbDivider = (props: SVGProps) => {
  const {
    color = "text-primary-accent-2",
    height,
    width,
    onClick,
    wrapperOverride,
    wrapperProps,
  } = props;

  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      className={`${color} ${height} ${width} ${wrapperOverride}`}
      {...wrapperProps}
    >
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  );
};

export { BreadcrumbDivider };
