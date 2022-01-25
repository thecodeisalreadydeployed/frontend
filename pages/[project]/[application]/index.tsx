import { useRouter } from "next/router";

import { useGetApplication } from "services";

import { PageTitle } from "@atoms";
import { DeploymentList } from "@organisms";
import { HeaderLayout } from "@templates";

const Overview = (): JSX.Element => {
  const router = useRouter();
  const { application: applicationId } = router.query;

  const { application } = useGetApplication(
    typeof applicationId === "string" ? applicationId : undefined
  );

  return (
    <div className="container mt-6">
      <PageTitle>{application?.name}</PageTitle>
      <DeploymentList applicationId={application?.id} />
    </div>
  );
};

Overview.getLayout = HeaderLayout;

export default Overview;
