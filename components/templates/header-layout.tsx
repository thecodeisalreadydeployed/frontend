import { Header } from "@organisms";

const HeaderLayout = (page: React.ReactElement): JSX.Element => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export { HeaderLayout };
