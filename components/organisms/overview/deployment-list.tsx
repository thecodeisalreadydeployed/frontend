import { formatDistanceToNowStrict, intervalToDuration } from "date-fns";
import { useGetDeployments } from "services";

import { DeploymentStatus } from "@atoms";
import { DeploymentSummaryRow } from "@molecules";
import { Deployment } from "types/schema";

interface DeploymentListProps {
  applicationId?: string;
}

const deploymentStatusApiMap = (status: string): DeploymentStatus => {
  switch (status) {
    case "DeploymentStateReady":
      return "ready";
    case "DeploymentStateError":
      return "error";
    case "DeploymentStateBuilding":
      return "building";
    case "DeploymentStateQueueing":
      return "queueing";
    default:
      return "error";
  }
};

const DeploymentList = (props: DeploymentListProps): JSX.Element => {
  const { applicationId } = props;

  const { deployments } = useGetDeployments(applicationId);

  return (
    <div>
      <h2 className="text-2xl font-bold">Deployments</h2>
      <p className="mt-3.5 mb-6 text-sm text-zinc-400">
        Deployments that are currently being worked on.
      </p>
      <div className="overflow-hidden rounded-lg border border-zinc-600 divide-y divide-zinc-600">
        {deployments?.map((deployment: Deployment) => {
          const builtDate = new Date(deployment.builtAt);
          const updatedDate = new Date(deployment.updatedAt);
          const createdDate = new Date(deployment.createdAt);

          const buildDuration = intervalToDuration({
            start: builtDate,
            end: createdDate,
          });

          const updatedToNow = formatDistanceToNowStrict(updatedDate);

          return (
            <DeploymentSummaryRow
              key={deployment?.id}
              applicationName={deployment?.gitSource.commitMessage}
              author={deployment?.gitSource.commitAuthorName}
              // TODO: - fix edge case where the duration is more than 24 hours
              deploymentStatus={deploymentStatusApiMap(deployment.state)}
              duration={`${
                buildDuration.hours ? buildDuration.hours + "h" : ""
              } ${buildDuration.minutes}m ${buildDuration.seconds}s`}
              updatedAt={updatedToNow}
            />
          );
        })}
      </div>
    </div>
  );
};

export { DeploymentList };
