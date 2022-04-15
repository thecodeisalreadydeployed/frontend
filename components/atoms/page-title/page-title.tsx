interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle = (props: PageTitleProps): JSX.Element => {
  const { children } = props;
  return <h1 className="text-4xl font-bold">{children}</h1>;
};

export { PageTitle };
