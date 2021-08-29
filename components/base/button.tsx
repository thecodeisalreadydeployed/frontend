type ButtonSize = "small" | "medium" | "large";
type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "alert"
  | "violet";

type ButtonType = "border" | "ghost";

interface ButtonProps {
  text: string;
  size: ButtonSize;
  color: ButtonColor;
  type: ButtonType;
  Prefix?: (props: React.ComponentProps<"svg">) => JSX.Element;
  Suffix?: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const variant = (size: ButtonSize, color: ButtonColor, type: ButtonType) => {
  let tw_buttonHeight = "";
  let tw_buttonColor = "";
  let tw_buttonBorder = "border ";
  let tw_buttonTextColor = "";
  let tw_iconSize = "";

  switch (size) {
    case "small":
      tw_buttonHeight = "h-8";
      tw_iconSize = "h-4 w-4";
      break;
    case "medium":
      tw_buttonHeight = "h-10";
      tw_iconSize = "h-5 w-5";
      break;
    case "large":
      tw_buttonHeight = "h-12";
      tw_iconSize = "h-6 w-6";
      break;
  }

  switch (color) {
    case "primary":
      if (type === "border") {
        tw_buttonColor = "bg-primary";
        tw_buttonBorder += "border-primary";
        tw_buttonTextColor = "text-primary-background hover:text-primary";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-primary-accent-5 hover:bg-opacity-20";
        tw_buttonTextColor = "text-primary";
      }
      break;
    case "secondary":
      if (type === "border") {
        tw_buttonColor = "bg-primary-background";
        tw_buttonBorder += "border-primary-accent-2 hover:border-primary";
        tw_buttonTextColor = "text-primary-accent-5 hover:text-primary";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-primary-accent-5 hover:bg-opacity-20";
        tw_buttonTextColor = "text-primary-accent-5";
      }
      break;
    case "success":
      if (type === "border") {
        tw_buttonColor = "bg-success";
        tw_buttonBorder += "border-success";
        tw_buttonTextColor = "text-primary-background hover:text-success";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-success  hover:bg-opacity-20";
        tw_buttonTextColor = "text-success";
      }

      break;
    case "error":
      if (type === "border") {
        tw_buttonColor = "bg-error";
        tw_buttonBorder += "border-error";
        tw_buttonTextColor = "text-primary-background hover:text-error";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-error hover:bg-opacity-20";
        tw_buttonTextColor = "text-error";
      }

      break;
    case "warning":
      if (type === "border") {
        tw_buttonColor = "bg-warning";
        tw_buttonBorder += "border-warning";
        tw_buttonTextColor = "text-primary-background hover:text-warning";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-warning hover:bg-opacity-20";
        tw_buttonTextColor = "text-warning";
      }

      break;
    case "alert":
      if (type === "border") {
        tw_buttonColor = "bg-highlight-pink";
        tw_buttonBorder += "border-highlight-pink";
        tw_buttonTextColor =
          "text-primary-background hover:text-highlight-pink";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-highlight-pink hover:bg-opacity-20";
        tw_buttonTextColor = "text-highlight-pink";
      }

      break;
    case "violet":
      if (type === "border") {
        tw_buttonColor = "bg-violet";
        tw_buttonBorder += "border-violet";
        tw_buttonTextColor = "text-primary-background hover:text-violet";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-violet hover:bg-opacity-20";
        tw_buttonTextColor = "text-violet";
      }
      break;
  }

  if (type !== "border") {
    tw_buttonBorder = "";
  }

  return {
    buttonHeight: tw_buttonHeight,
    buttonColor: tw_buttonColor,
    buttonBorder: tw_buttonBorder,
    buttonTextColor: tw_buttonTextColor,
    iconSize: tw_iconSize,
  };
};

const Button = (props: ButtonProps) => {
  const { text, size, color, type, Suffix, Prefix } = props;

  const { buttonHeight, buttonColor, buttonBorder, buttonTextColor, iconSize } =
    variant(size, color, type);

  return (
    <button
      className={`flex items-center px-3 hover:bg-primary-background rounded active:bg-primary-accent-2 ${buttonHeight} ${buttonTextColor} ${buttonColor} ${buttonBorder}`}
    >
      {Prefix && <Prefix className={`mr-2 ${iconSize}`} />}
      {text}
      {Suffix && <Suffix className={`ml-2 ${iconSize}`} />}
    </button>
  );
};

export { Button };
