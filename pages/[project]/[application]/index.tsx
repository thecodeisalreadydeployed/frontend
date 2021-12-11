import { useRouter } from "next/router";
import { TitleHeader, DeploymentList } from "@organisms";
import { App } from "@types_/api-schema";
import { HeaderLayout } from "@templates";
import useSWR from "swr";

const Overview = () => {
  const router = useRouter();
  const { application: applicationId } = router.query;

  const { data: application } = useSWR<App>(
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
