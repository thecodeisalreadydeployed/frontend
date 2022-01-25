import { DeploymentStatus, DeploymentStatusDot } from "@atoms";

interface DeploymentSummaryRowProps {
  applicationName: string;
  duration?: string;
  updatedAt?: string;
  author?: string;
  deploymentStatus?: DeploymentStatus;
}

const DeploymentSummaryRow = (
  props: DeploymentSummaryRowProps
): JSX.Element => {
  const {
    applicationName,
    author,
    deploymentStatus = "ready",
    duration,
    updatedAt,
  } = props;

  return (
    <div className="grid grid-cols-4 items-center p-4">
      <div className="h-10">
        <p className="text-sm font-bold truncate cursor-pointer line-clamp-1">
          {applicationName}
        </p>
        <p className="text-sm line-clamp-1">Preview</p>
      </div>
      <div className="flex flex-col justify-between h-10">
        <DeploymentStatusDot status={deploymentStatus} />
        <p className="text-sm line-clamp-1">{duration}</p>
      </div>
      <div className="col-span-2 text-right">
        <p className="text-sm line-clamp-1">
          {updatedAt} ago by {author}
        </p>
      </div>
    </div>
  );
};

export { DeploymentSummaryRow };
