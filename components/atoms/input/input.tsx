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
        "flex-1 px-3 w-full placeholder:text-zinc-400 text-zinc-200 bg-zinc-800 rounded border border-zinc-600 focus:border-zinc-400 outline-none disabled:cursor-not-allowed",
        SIZE_MAPS[size]
      )}
      disabled={disabled}
      id={id}
      size={1}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={spellCheck}
      type={type}
      value={value}
    />
  );
};
