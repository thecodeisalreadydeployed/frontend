import clsx from "clsx";

type InputSize = "sm" | "md" | "lg";
type InputType = "text" | "search" | "password";

const SIZE_MAPS: Record<InputSize, string> = {
  sm: clsx("py-1.5 text-sm"),
  md: clsx("py-2.5 text-sm"),
  lg: clsx("py-3 text-base"),
};

interface InputProps {
  autoComplete?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  size?: InputSize;
  spellCheck?: boolean;
  type?: InputType;
  value?: string;
}

export const Input = (props: InputProps): JSX.Element => {
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
  } = props;

  return (
    <input
      autoComplete={autoComplete ? "on" : "off"}
      className={clsx(
        "flex-1 px-3 w-full placeholder:text-zinc-600 text-zinc-200 disabled:placeholder:text-zinc-700 bg-zinc-800 disabled:bg-zinc-700 rounded-lg border border-zinc-600 focus:border-zinc-500 outline-none disabled:cursor-not-allowed",
        SIZE_MAPS[size]
      )}
      disabled={disabled}
      id={id}
      placeholder={placeholder}
      size={1}
      spellCheck={spellCheck}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
