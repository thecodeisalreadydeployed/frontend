import { InputSize } from "./index";

const variant = (size: InputSize) => {
  let tw_inputHeight: string;
  let tw_inputTextSize: string;

  switch (size) {
    case "sm":
      tw_inputHeight = "h-8";
      tw_inputTextSize = "text-sm";
      break;
    case "md":
      tw_inputHeight = "h-10";
      tw_inputTextSize = "text-sm";
      break;
    case "lg":
      tw_inputHeight = "h-12";
      tw_inputTextSize = "text-base";
      break;
  }

  return {
    inputHeight: tw_inputHeight,
    inputTextSize: tw_inputTextSize,
  };
};

export { variant };
