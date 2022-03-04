import clsx from "clsx";

type Color = "primary" | "danger";

type Size = "sm" | "md" | "lg";
type Type = "outline" | "solid";

interface CSSProps {
  button: {
    typeColorMap: Record<`${Type}_${Color}`, string>;
    sizeMap: Record<Size, string>;
  };
}

const CSS: CSSProps = {
  button: {
    typeColorMap: {
      outline_primary: clsx(
        "border-zinc-200/0 text-zinc-200 hover:border-zinc-200"
      ),
      outline_danger: clsx(
        "border-red-400/0 text-red-400 hover:border-red-400"
      ),
      solid_primary: clsx(
        "border-zinc-200 bg-zinc-200 text-zinc-800 hover:bg-zinc-200/0 hover:text-zinc-200"
      ),
      solid_danger: clsx(
        "border-red-400 bg-red-400 text-zinc-200 hover:bg-red-400/0 hover:text-red-400"
      ),
    },
    sizeMap: {
      sm: clsx("py-1.5 text-sm"),
      md: clsx("py-2.5 text-sm"),
      lg: clsx("py-3 text-base"),
    },
  },
};

interface ButtonProps {
  children?: React.ReactNode;
  color?: Color;
  fullWidth?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  size?: Size;
  type?: Type;
  disabled?: boolean;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {
    children,
    color = "primary",
    disabled = false,
    fullWidth = false,
    id,
    onClick,
    size = "md",
    type = "solid",
  } = props;

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-lg border px-4 align-middle transition-colors duration-150 ease-linear",
        CSS.button.typeColorMap[`${type}_${color}` as const],
        CSS.button.sizeMap[size],
        fullWidth && "w-full"
      )}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
