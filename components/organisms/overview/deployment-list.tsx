import useSWR from "swr";
import { DeploymentSummaryRow } from "@molecules";
import { DeploymentStatus } from "@atoms";
import { Deployment } from "@types_/api";

interface DeploymentListProps {
  applicationId?: string;
}

const msToHMS = (ms: number) => {
  let seconds = ms / 1000;
  const hours = seconds / 3600;
  seconds = seconds % 3600;
  const minutes = seconds / 60;
  seconds = seconds % 60;

  return {
    hours: parseInt(`${hours}`),
    minutes: parseInt(`${minutes}`),
    seconds: parseInt(`${seconds}`),
  };
};

const msToSelectiveDHMS = (ms: number) => {
  if (ms < 1000 * 60) {
    return Math.floor(ms / 1000) + "s";
  } else if (ms < 1000 * 60 * 60) {
    return Math.floor(ms / 1000 / 60) + "m";
  } else if (ms < 1000 * 60 * 60 * 24) {
    return Math.floor(ms / 1000 / 60 / 60) + "h";
  } else {
    return Math.floor(ms / 1000 / 60 / 60 / 24) + "d";
  }
};

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
          const committedDate = new Date(deployment.committedAt);
          const builtDate = new Date(deployment.builtAt);
          const updatedDate = new Date(deployment.updatedAt);
          const createdDate = new Date(deployment.createdAt);

          const buildDuration = Math.abs(
            builtDate.getTime() - createdDate.getTime()
          );
          const { hours, minutes, seconds } = msToHMS(buildDuration);

          const durationSinceUpdated = Math.abs(
            new Date().getTime() - updatedDate.getTime()
          );

          return (
            <DeploymentSummaryRow
              key={deployment?.id}
              applicationName={deployment?.gitSource.commitMessage}
              author={deployment?.gitSource.commitAuthorName}
              duration={`${hours != 0 ? `${hours}h` : ""} ${
                minutes != 0 ? `${minutes}m ` : ""
              } ${seconds != 0 ? `${seconds}s` : ""}`}
              updatedAt={msToSelectiveDHMS(durationSinceUpdated).toString()}
              deploymentStatus={deploymentStatusApiMap(deployment.state)}
            />
          );
        })}
      </div>
    </div>
  );
};

export { DeploymentList };
