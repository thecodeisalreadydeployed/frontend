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
        "inline-block overflow-hidden p-6 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-600 hover:border-zinc-400 transition-colors duration-150 cursor-pointer"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
