import clsx from "clsx";

import { DeploymentStatusDot } from "@atoms";
import { DeploymentState } from "types/schema";

interface DeploymentSummaryRowProps {
  applicationName: string;
  duration?: string;
  updatedAt?: string;
  author?: string;
  deploymentStatus?: DeploymentState;
  rowIndex: number;
}

const DeploymentSummaryRow = (
  props: DeploymentSummaryRowProps
): JSX.Element => {
  const {
    applicationName,
    author,
    deploymentStatus = DeploymentState.DeploymentStateQueueing,
    duration,
    updatedAt,
    rowIndex,
  } = props;

  return (
    <div className="bg-black">
      <div
        className={clsx(
          "grid cursor-pointer grid-cols-4 items-center p-4 hover:bg-zinc-700",
          rowIndex % 2 === 0 ? "bg-zinc-800" : "bg-zinc-800/80"
        )}
      >
        <div className="h-10">
          <p className="cursor-pointer truncate text-sm font-bold line-clamp-1">
            {applicationName}
          </p>
        </div>
        <div className="flex h-10 flex-col justify-between">
          <DeploymentStatusDot status={deploymentStatus} />
          <p className="truncate text-sm">{duration}</p>
        </div>
        <div className="col-span-2 text-right">
          <p className="text-sm line-clamp-1">
            {updatedAt} ago by {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export { DeploymentSummaryRow };
