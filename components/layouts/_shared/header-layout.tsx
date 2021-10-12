import { Header } from "@elements";

const HeaderLayout = (page: React.ReactElement) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export { HeaderLayout };
