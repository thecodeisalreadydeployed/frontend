import React from "react";

import { THeight, TTextColor, TWidth } from "styles/tailwind-type";

interface SVGProps {
  wrapperProps?: Omit<React.SVGProps<SVGSVGElement>, "className">;
  width?: TWidth;
  height?: THeight;
  color?: TTextColor;
  onClick?: React.SVGProps<SVGSVGElement>["onClick"];
  wrapperOverride?: string;
}

export { SVGProps };
