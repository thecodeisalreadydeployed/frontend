import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import formatDistanceStrict from "date-fns/formatDistanceStrict";
import intervalToDuration from "date-fns/intervalToDuration";
import { useGetApplicationDeployments } from "services";

import { DeploymentSummaryRow } from "@molecules";
import { Deployment, DeploymentState } from "types/schema";

interface DeploymentListProps {
  applicationId?: string;
}

const DeploymentList = (props: DeploymentListProps): JSX.Element => {
  const { applicationId } = props;
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());
  const { deployments } = useGetApplicationDeployments(applicationId, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="overflow-hidden rounded-lg">
        {deployments
          ?.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((deployment: Deployment, index) => {
            const builtDate = new Date(deployment.builtAt);
            const updatedDate = new Date(deployment.updatedAt);
            const createdDate = new Date(deployment.createdAt);

            const updatedToNow = formatDistanceStrict(updatedDate, currentDate);

            let durationString = "";

            switch (deployment.state) {
              case DeploymentState.DeploymentStateReady:
              case DeploymentState.DeploymentStateError:
                {
                  const buildDuration = intervalToDuration({
                    start: createdDate,
                    end: builtDate,
                  });

                  durationString = `${
                    buildDuration.hours ? buildDuration.hours + "h" : ""
                  } ${buildDuration.minutes}m ${buildDuration.seconds}s`;
                }
                break;
              case DeploymentState.DeploymentStateCommitted:
                durationString = "";
                break;
              default:
                {
                  const buildDuration = intervalToDuration({
                    start: createdDate,
                    end: currentDate,
                  });
                  durationString = `${
                    buildDuration.hours ? buildDuration.hours + "h" : ""
                  } ${buildDuration.minutes}m ${buildDuration.seconds}s`;
                }
                break;
            }

            return (
              <div key={deployment?.id}>
                <Link href={`${router.asPath}/${deployment.id}`}>
                  <a>
                    <DeploymentSummaryRow
                      applicationName={deployment?.gitSource.commitMessage}
                      author={deployment?.gitSource.commitAuthorName}
                      deploymentStatus={deployment.state}
                      // TODO: - fix edge case where the duration is more than 24 hours
                      duration={durationString}
                      rowIndex={index}
                      updatedAt={updatedToNow}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { DeploymentList };
