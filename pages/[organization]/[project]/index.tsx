import { useRouter } from "next/router";
import { HeaderLayout } from "@layouts";

const Overview = () => {
  const router = useRouter();
  const { project } = router.query;

  return <div>Project: {project}</div>;
};

Overview.getLayout = HeaderLayout;

export default Overview;
