type ButtonSize = "small" | "medium" | "large";
type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "alert"
  | "violet";

interface ButtonProps {
  text: string;
  size: ButtonSize;
  color: ButtonColor;
  Prefix?: (props: React.ComponentProps<"svg">) => JSX.Element;
  Suffix?: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const variant = (size: ButtonSize, color: ButtonColor) => {
  let tw_buttonHeight = "";
  let tw_buttonColor = "";
  let tw_buttonBorder = "border ";
  let tw_buttonTextColor = "";

  switch (size) {
    case "small":
      tw_buttonHeight = "h-8";
      break;
    case "medium":
      tw_buttonHeight = "h-10";
      break;
    case "large":
      tw_buttonHeight = "h-12";
      break;
  }

  switch (color) {
    case "primary":
      tw_buttonColor = "bg-primary";
      tw_buttonBorder += "border-primary";
      tw_buttonTextColor = "text-primary-background hover:text-primary";
      break;
    case "secondary":
      tw_buttonColor = "bg-primary-background";
      tw_buttonBorder += "border-primary-accent-2 hover:border-primary";
      tw_buttonTextColor = "text-primary-accent-5 hover:text-primary";
      break;
    case "success":
      tw_buttonColor = "bg-success";
      tw_buttonBorder += "border-success";
      tw_buttonTextColor = "text-primary-background hover:text-success";

      break;
    case "error":
      tw_buttonColor = "bg-error";
      tw_buttonBorder += "border-error";
      tw_buttonTextColor = "text-primary-background hover:text-error";

      break;
    case "warning":
      tw_buttonColor = "bg-warning";
      tw_buttonBorder += "border-warning";
      tw_buttonTextColor = "text-primary-background hover:text-warning";

      break;
    case "alert":
      tw_buttonColor = "bg-highlight-pink";
      tw_buttonBorder += "border-highlight-pink";
      tw_buttonTextColor = "text-primary-background hover:text-highlight-pink";

      break;
    case "violet":
      tw_buttonColor = "bg-violet";
      tw_buttonBorder += "border-violet";
      tw_buttonTextColor = "text-primary-background hover:text-violet";
      break;
  }

  return {
    buttonHeight: tw_buttonHeight,
    buttonColor: tw_buttonColor,
    buttonBorder: tw_buttonBorder,
    buttonTextColor: tw_buttonTextColor,
  };
};

const Button = (props: ButtonProps) => {
  const { text, size, color, Suffix, Prefix } = props;

  const { buttonHeight, buttonColor, buttonBorder, buttonTextColor } = variant(
    size,
    color
  );

  return (
    <button
      className={`flex items-center px-3 hover:text-primary hover:bg-primary-background rounded active:bg-primary-accent-2 ${buttonHeight} ${buttonTextColor} ${buttonColor} ${buttonBorder}`}
    >
      {Prefix && <Prefix className="mr-2" />}
      {text}
      {Suffix && <Suffix className="ml-2" />}
    </button>
  );
};

export { Button };
