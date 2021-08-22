import type { NextPage } from "next";

import { Award } from "react-feather";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center py-3 space-x-5 text-2xl font-bold text-center bg-[#f3f3f3]">
      <p>Hello World</p>
      <Award />
    </div>
  );
};

export default Home;
