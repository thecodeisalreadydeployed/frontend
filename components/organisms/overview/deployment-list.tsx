import Link from "next/link";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict, intervalToDuration } from "date-fns";
import { useGetApplicationDeployments } from "services";

import { DeploymentSummaryRow } from "@molecules";
import { Deployment } from "types/schema";

interface DeploymentListProps {
  applicationId?: string;
}

const DeploymentList = (props: DeploymentListProps): JSX.Element => {
  const { applicationId } = props;
  const router = useRouter();

  const { deployments } = useGetApplicationDeployments(applicationId);

  return (
    <div>
      <div className="divide-y divide-zinc-600 overflow-hidden rounded-lg border border-zinc-600">
        {deployments
          ?.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((deployment: Deployment) => {
            const builtDate = new Date(deployment.builtAt);
            const updatedDate = new Date(deployment.updatedAt);
            const createdDate = new Date(deployment.createdAt);

            const buildDuration = intervalToDuration({
              start: createdDate,
              end: builtDate,
            });

            const updatedToNow = formatDistanceToNowStrict(updatedDate);

            return (
              <Link
                key={deployment?.id}
                href={`${router.asPath}/${deployment.id}`}
              >
                <a>
                  <DeploymentSummaryRow
                    applicationName={deployment?.gitSource.commitMessage}
                    author={deployment?.gitSource.commitAuthorName}
                    // TODO: - fix edge case where the duration is more than 24 hours
                    deploymentStatus={deployment.state}
                    duration={`${
                      buildDuration.hours ? buildDuration.hours + "h" : ""
                    } ${buildDuration.minutes}m ${buildDuration.seconds}s`}
                    updatedAt={updatedToNow}
                  />
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export { DeploymentList };
