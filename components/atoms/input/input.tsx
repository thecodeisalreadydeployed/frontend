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
        "w-full flex-1 rounded-lg bg-zinc-800 px-3 text-zinc-200 outline-none ring-inset ring-zinc-600 placeholder:text-zinc-600 focus:ring-1 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:placeholder:text-zinc-700",
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
