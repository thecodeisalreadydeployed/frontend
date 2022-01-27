import type { SVGProps } from "./svg";

const BreadcrumbDivider = (props: SVGProps): JSX.Element => {
  const {
    color = "text-primary-accent-2",
    height,
    onClick,
    width,
    wrapperOverride,
    wrapperProps,
  } = props;

  return (
    <svg
      className={`${color} ${height} ${width} ${wrapperOverride}`}
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      width="24"
      onClick={onClick}
      {...wrapperProps}
    >
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  );
};

export { BreadcrumbDivider };
