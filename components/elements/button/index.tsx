import { Icon } from "react-feather";
import { variant } from "./variant";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "alert"
  | "violet";

export type ButtonVariant = "border" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  Prefix?: Icon | ((props: React.ComponentProps<"svg">) => JSX.Element);
  Suffix?: Icon | ((props: React.ComponentProps<"svg">) => JSX.Element);
}

const Button = (props: ButtonProps) => {
  const {
    children,
    size = "medium",
    color = "primary",
    variant: buttonVariant = "border",
    Suffix,
    Prefix,
    ...buttonProps
  } = props;

  const { buttonHeight, buttonColor, buttonBorder, buttonTextColor, iconSize } =
    variant(size, color, buttonVariant);

  return (
    <button
      className={`flex items-center px-3 rounded ${buttonHeight} ${buttonTextColor} ${buttonColor} ${buttonBorder}`}
      {...buttonProps}
    >
      {Prefix && <Prefix className={`mr-2 stroke-[1.5px] ${iconSize}`} />}
      {children}
      {Suffix && <Suffix className={`ml-2 stroke-[1.5px] ${iconSize}`} />}
    </button>
  );
};

export { Button };
