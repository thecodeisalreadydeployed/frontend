import clsx from "clsx";

type Color = "primary" | "secondary";

type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children?: React.ReactNode;
  color?: Color;
  fullWidth?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  size?: Size;
}

const SIZE_MAPS: Record<Size, string> = {
  sm: clsx("py-1.5 text-sm"),
  md: clsx("py-2.5 text-sm"),
  lg: clsx("py-3 text-base"),
};

const COLOR_MAPS: Record<Color, string> = {
  primary: clsx(
    "text-zinc-800 hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-800 border-zinc-100"
  ),
  secondary: clsx(
    "text-zinc-100 bg-zinc-800 border-zinc-800 hover:border-zinc-100"
  ),
};
export const Button = (props: ButtonProps): JSX.Element => {
  const {
    children,
    color = "primary",
    fullWidth = false,
    id,
    onClick,
    size = "md",
  } = props;

  return (
    <button
      className={clsx(
        "inline-flex justify-center items-center px-4 align-middle rounded-lg border transition-colors duration-150 ease-linear",
        COLOR_MAPS[color],
        SIZE_MAPS[size],
        fullWidth && "w-full"
      )}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
