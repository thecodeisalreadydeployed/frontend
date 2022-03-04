import clsx from "clsx";

interface CardProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Card = (props: CardProps): JSX.Element => {
  const { children, onClick } = props;

  return (
    <div
      className={clsx(
        "inline-block cursor-pointer overflow-hidden rounded-lg border border-zinc-600 bg-zinc-800 p-6 transition-colors duration-150 hover:border-zinc-500 hover:bg-zinc-700"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
