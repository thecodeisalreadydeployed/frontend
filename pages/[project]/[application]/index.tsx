import { useRouter } from "next/router";
import { TitleHeader, DeploymentList } from "@organisms";
import { Application } from "@types_/api";
import { HeaderLayout } from "@templates";
import useSWR from "swr";

const Overview = () => {
  const router = useRouter();
  const { application: applicationId } = router.query;

  const { data: application } = useSWR<Application>(
    applicationId ? `http://localhost:3001/app/${applicationId}` : null
  );

  return (
    <div>
      <TitleHeader applicationTitle={application?.name} />
      <DeploymentList applicationId={application?.id} />
    </div>
  );
};

Overview.getLayout = HeaderLayout;

export default Overview;
