import { variant } from "./variant";

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
  autoComplete?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  size?: InputSize;
  spellCheck?: boolean;
  type?: Exclude<InputType, "checkbox" | "radio">;
  value?: string;
  wrapperOverride?: string;
  wrapperProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;
}

const Input = (props: InputProps) => {
  const {
    autoComplete = false,
    disabled = false,
    id,
    onChange = () => null,
    placeholder,
    size = "md",
    spellCheck = false,
    type = "text",
    value,
    wrapperOverride = "",
    wrapperProps,
  } = props;

  const { inputHeight, inputTextSize } = variant(size);

  return (
    <input
      autoComplete={autoComplete ? "on" : "off"}
      className={`rounded border placeholder-[#A9A9A9] disabled:bg-primary-accent-1 disabled:cursor-not-allowed border-primary-accent-2 px-3 outline-none focus:border-primary-accent-5 w-full ${inputHeight} ${inputTextSize} ${wrapperOverride}`}
      disabled={disabled}
      id={id}
      size={1}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={spellCheck}
      type={type}
      value={value}
      {...wrapperProps}
    />
  );
};

export { Input };
