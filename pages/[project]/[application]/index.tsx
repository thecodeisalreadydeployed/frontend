import { useRouter } from "next/router";

import useSWR from "swr";

import { DeploymentList, TitleHeader } from "@organisms";
import { HeaderLayout } from "@templates";
import { App } from "types/schema";

const Overview = () => {
  const router = useRouter();
  const { application: applicationId } = router.query;

  const { data: application } = useSWR<App>(
    applicationId ? `http://localhost:3001/apps/${applicationId}` : null
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
