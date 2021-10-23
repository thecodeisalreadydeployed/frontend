import { useRouter } from "next/router";
import { HeaderLayout } from "@templates";

const Overview = () => {
  const router = useRouter();
  const { application } = router.query;

  return <div>Application: {application}</div>;
};

Overview.getLayout = HeaderLayout;

export default Overview;
