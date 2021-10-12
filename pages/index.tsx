import { Award } from "react-feather";
import { Header } from "@elements";

const Home = () => {
  return (
    <div className="flex justify-center items-center py-3 space-x-5 text-2xl font-bold text-center bg-[#f3f3f3]">
      <p>Hello World</p>
      <Award />
    </div>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  );
};

export default Home;
