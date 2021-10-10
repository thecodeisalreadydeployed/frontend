import { Icon } from "react-feather";
import { variant } from "./variant";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "alert"
  | "violet";

export type ButtonVariant = "border" | "ghost";

interface ButtonProps {
  wrapperProps?: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "onClick"
  >;
  children: string;
  color?: ButtonColor;
  IconPrefix?: Icon | ((props: React.ComponentProps<"svg">) => JSX.Element);
  IconSuffix?: Icon | ((props: React.ComponentProps<"svg">) => JSX.Element);
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  size?: ButtonSize;
  variant?: ButtonVariant;
  wrapperOverride?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    color = "primary",
    IconPrefix,
    IconSuffix,
    onClick,
    size = "md",
    variant: buttonVariant = "border",
    wrapperOverride,
    wrapperProps,
  } = props;

  const { buttonHeight, buttonColor, buttonBorder, buttonTextColor, iconSize } =
    variant(size, color, buttonVariant);

  return (
    <button
      onClick={onClick}
      className={`inline-flex align-middle items-center px-3 rounded ${buttonBorder} ${buttonColor} ${buttonHeight} ${buttonTextColor} ${wrapperOverride}`}
      {...wrapperProps}
    >
      {IconPrefix && (
        <IconPrefix className={`mr-2 stroke-[1.5px] ${iconSize}`} />
      )}
      {children}
      {IconSuffix && (
        <IconSuffix className={`ml-2 stroke-[1.5px] ${iconSize}`} />
      )}
    </button>
  );
};

export { Button };
