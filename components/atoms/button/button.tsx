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
    "text-black hover:text-white bg-white hover:bg-black border-white"
  ),
  secondary: clsx(
    "text-white hover:text-black bg-black hover:bg-white border-black"
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
      id={id}
      onClick={onClick}
      className={clsx(
        "inline-flex justify-center items-center px-4 align-middle rounded border transition-colors duration-150 ease-linear",
        COLOR_MAPS[color],
        SIZE_MAPS[size],
        fullWidth && "w-full"
      )}
    >
      {children}
    </button>
  );
};
