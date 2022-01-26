import clsx from "clsx";

type Color = "primary" | "danger";

type Size = "sm" | "md" | "lg";
type Type = "outline" | "solid";

// const SIZE_MAPS: Record<Size, string> = {
//   sm: clsx("py-1.5 text-sm"),
//   md: clsx("py-2.5 text-sm"),
//   lg: clsx("py-3 text-base"),
// };

// const COLOR_MAPS: Record<Color, string> = {
//   primary: clsx(
//     "text-zinc-800 hover:text-zinc-100 bg-zinc-100 hover:bg-zinc-800 border-zinc-100"
//   ),
//   secondary: clsx(
//     "text-zinc-100 bg-zinc-800 border-zinc-800 hover:border-zinc-100"
//   ),
//   danger: clsx("text-zinc-200 bg-red-700 border-red-700 hover:border-red-100"),
// };

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
        "text-zinc-200 border-zinc-200/0 hover:border-zinc-200"
      ),
      outline_danger: clsx(
        "text-red-400 border-red-400/0 hover:border-red-400"
      ),
      solid_primary: clsx(
        "text-zinc-800 hover:text-zinc-200 bg-zinc-200 hover:bg-zinc-200/0 border-zinc-200"
      ),
      solid_danger: clsx(
        "text-zinc-200 hover:text-red-400 bg-red-400 hover:bg-red-400/0 border-red-400"
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
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {
    children,
    color = "primary",
    fullWidth = false,
    id,
    onClick,
    size = "md",
    type = "solid",
  } = props;

  return (
    <button
      className={clsx(
        "inline-flex justify-center items-center px-4 align-middle rounded-lg border transition-colors duration-150 ease-linear",
        CSS.button.typeColorMap[`${type}_${color}`],
        CSS.button.sizeMap[size],
        fullWidth && "w-full"
      )}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
