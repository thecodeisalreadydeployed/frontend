import { Header } from "@organisms";

const HeaderLayout = (page: React.ReactElement) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export { HeaderLayout };
