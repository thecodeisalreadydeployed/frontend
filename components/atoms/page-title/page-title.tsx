interface PageTitleProps {
  children: string;
}

const PageTitle = (props: PageTitleProps) => {
  const { children } = props;
  return <h1 className="mb-4 text-4xl font-medium reset">{children}</h1>;
};

export { PageTitle };
