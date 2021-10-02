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
  wrapperProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: string;
  color?: ButtonColor;
  Prefix?: Icon | ((props: React.ComponentProps<"svg">) => JSX.Element);
  size?: ButtonSize;
  Suffix?: Icon | ((props: React.ComponentProps<"svg">) => JSX.Element);
  variant?: ButtonVariant;
  wrapperOverride?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    color = "primary",
    Prefix,
    size = "md",
    Suffix,
    variant: buttonVariant = "border",
    wrapperOverride,
    wrapperProps,
  } = props;

  const { buttonHeight, buttonColor, buttonBorder, buttonTextColor, iconSize } =
    variant(size, color, buttonVariant);

  return (
    <button
      className={`inline-flex align-middle items-center px-3 rounded ${buttonBorder} ${buttonColor} ${buttonHeight} ${buttonTextColor} ${wrapperOverride}`}
      {...wrapperProps}
    >
      {Prefix && <Prefix className={`mr-2 stroke-[1.5px] ${iconSize}`} />}
      {children}
      {Suffix && <Suffix className={`ml-2 stroke-[1.5px] ${iconSize}`} />}
    </button>
  );
};

export { Button };
