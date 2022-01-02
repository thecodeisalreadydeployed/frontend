interface CardProps {
  wrapperProps?: Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "className" | "children" | "onClick"
  >;
  children?: React.ReactNode;
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
  wrapperOverride?: string;
}

const Card = (props: CardProps): JSX.Element => {
  const { children, onClick, wrapperProps, wrapperOverride = "" } = props;

  return (
    <div
      className={`inline-block p-6 bg-primary-background rounded shadow hover:shadow-md transition-shadow duration-200 cursor-pointer ${wrapperOverride}`}
      onClick={onClick}
      {...wrapperProps}
    >
      {children}
    </div>
  );
};

export { Card };
