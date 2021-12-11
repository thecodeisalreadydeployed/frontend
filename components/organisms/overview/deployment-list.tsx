import useSWR from "swr";
import { DeploymentSummaryRow } from "@molecules";
import { DeploymentStatus } from "@atoms";
import { Deployment } from "@types_/api-schema";
import { intervalToDuration, formatDistanceToNowStrict } from "date-fns";

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

const DeploymentList = (props: DeploymentListProps) => {
  const { applicationId } = props;

  const { data: deployments } = useSWR(
    applicationId
      ? `http://localhost:3001/app/${applicationId}/deployments`
      : null
  );

  return (
    <div className="container my-12 reset">
      <h2 className="text-2xl font-semibold">Deployments</h2>
      <p className="mt-3.5 mb-6 text-sm text-primary-accent-6">
        Deployments that are currently being worked on.
      </p>
      <div className="bg-primary-background rounded border divide-y border-primary-accent-2 divide-primary-accent-2">
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
              duration={`${
                buildDuration.hours ? buildDuration.hours + "h" : ""
              } ${buildDuration.minutes}m ${buildDuration.seconds}s`}
              updatedAt={updatedToNow}
              deploymentStatus={deploymentStatusApiMap(deployment.state)}
            />
          );
        })}
      </div>
    </div>
  );
};

export { DeploymentList };
