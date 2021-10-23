import { variant } from "./variant";
import { TWidth } from "styles/tailwind-type";

export type InputSize = "sm" | "md" | "lg";
type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface InputProps {
  wrapperProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  placeholder?: string;
  size?: InputSize;
  type?: Exclude<InputType, "checkbox" | "radio">;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  width?: TWidth;
  wrapperOverride?: string;
}

const Input = (props: InputProps) => {
  const {
    disabled = false,
    onChange = () => null,
    placeholder,
    size = "md",
    type = "text",
    value,
    width = "w-60",
    wrapperOverride = "",
    wrapperProps,
  } = props;

  const { inputHeight, inputTextSize } = variant(size);

  return (
    <input
      className={`rounded border placeholder-[#A9A9A9] disabled:bg-primary-accent-1 disabled:cursor-not-allowed border-primary-accent-2 px-3 outline-none focus:border-primary-accent-5 ${width} ${inputHeight} ${inputTextSize} ${wrapperOverride}`}
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      {...wrapperProps}
    />
  );
};

export { Input };
