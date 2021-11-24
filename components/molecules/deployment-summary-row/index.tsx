import { DeploymentStatusDot, DeploymentStatus } from "@atoms";

interface DeploymentSummaryRowProps {
  applicationName: string;
  duration?: string;
  updatedAt?: string;
  author?: string;
  deploymentStatus?: DeploymentStatus;
}

const DeploymentSummaryRow = (props: DeploymentSummaryRowProps) => {
  const {
    applicationName,
    duration,
    updatedAt,
    author,
    deploymentStatus = "ready",
  } = props;

  return (
    <div className="grid grid-cols-4 items-center p-4 reset">
      <div className="h-10">
        <p className="text-sm font-semibold cursor-pointer line-clamp-1">
          {applicationName}
        </p>
        <p className="text-sm line-clamp-1 text-primary-accent-4">Preview</p>
      </div>
      <div className="h-10">
        <DeploymentStatusDot status={deploymentStatus} />
        <p className="text-sm line-clamp-1 text-primary-accent-4">{duration}</p>
      </div>
      <div className="col-span-2 text-right">
        <p className="text-sm line-clamp-1 text-primary-accent-5">
          {updatedAt} ago by {author}
        </p>
      </div>
    </div>
  );
};

export { DeploymentSummaryRow };
