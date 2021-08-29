import { ButtonColor, ButtonSize, ButtonVariant } from "./index";

const variant = (size: ButtonSize, color: ButtonColor, type: ButtonVariant) => {
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
        tw_buttonColor = "bg-primary hover:bg-primary-background";
        tw_buttonBorder += "border-primary";
        tw_buttonTextColor = "text-primary-background hover:text-primary";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-primary-accent-5 hover:bg-opacity-20 active:bg-opacity-30";
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
          "bg-primary-background hover:bg-primary-accent-5 hover:bg-opacity-20 active:bg-opacity-30";
        tw_buttonTextColor = "text-primary-accent-5";
      }
      break;
    case "success":
      if (type === "border") {
        tw_buttonColor = "bg-success hover:bg-primary-background";
        tw_buttonBorder += "border-success";
        tw_buttonTextColor = "text-primary-background hover:text-success";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-success  hover:bg-opacity-20 active:bg-opacity-30";
        tw_buttonTextColor = "text-success";
      }

      break;
    case "error":
      if (type === "border") {
        tw_buttonColor = "bg-error hover:bg-primary-background";
        tw_buttonBorder += "border-error";
        tw_buttonTextColor = "text-primary-background hover:text-error";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-error hover:bg-opacity-20 active:bg-opacity-30";
        tw_buttonTextColor = "text-error";
      }

      break;
    case "warning":
      if (type === "border") {
        tw_buttonColor = "bg-warning hover:bg-primary-background";
        tw_buttonBorder += "border-warning";
        tw_buttonTextColor = "text-primary-background hover:text-warning";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-warning hover:bg-opacity-20 active:bg-opacity-30";
        tw_buttonTextColor = "text-warning";
      }

      break;
    case "alert":
      if (type === "border") {
        tw_buttonColor = "bg-highlight-pink hover:bg-primary-background";
        tw_buttonBorder += "border-highlight-pink";
        tw_buttonTextColor =
          "text-primary-background hover:text-highlight-pink";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-highlight-pink hover:bg-opacity-20 active:bg-opacity-30";
        tw_buttonTextColor = "text-highlight-pink";
      }

      break;
    case "violet":
      if (type === "border") {
        tw_buttonColor = "bg-violet hover:bg-primary-background";
        tw_buttonBorder += "border-violet";
        tw_buttonTextColor = "text-primary-background hover:text-violet";
      } else if (type === "ghost") {
        tw_buttonColor =
          "bg-primary-background hover:bg-violet hover:bg-opacity-20 active:bg-opacity-30";
        tw_buttonTextColor = "text-violet";
      }
      break;
  }

  if (type === "ghost") {
    tw_buttonBorder = "";
  } else if (type === "border") {
    tw_buttonColor += " active:bg-primary-accent-2";
  }

  return {
    buttonHeight: tw_buttonHeight,
    buttonColor: tw_buttonColor,
    buttonBorder: tw_buttonBorder,
    buttonTextColor: tw_buttonTextColor,
    iconSize: tw_iconSize,
  };
};

export { variant };
