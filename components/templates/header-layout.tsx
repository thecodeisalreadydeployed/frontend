import { Header } from "@organisms";

const HeaderLayout = (page: React.ReactElement): JSX.Element => {
  return (
    <>
      <Header />
      {page}
      <div className="mt-16" />
    </>
  );
};

export { HeaderLayout };
