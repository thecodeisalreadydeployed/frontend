import { Award } from "react-feather";
import { HeaderLayout } from "@layouts";

const Project = () => {
  return (
    <div className="flex justify-center items-center py-3 space-x-5 text-2xl font-bold text-center bg-[#f3f3f3]">
      <p>Hello World</p>
      <Award />
    </div>
  );
};

Project.getLayout = HeaderLayout;

export default Project;
