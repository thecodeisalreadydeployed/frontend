import { variant } from "./variant";

export type Status = "ready" | "error";

interface DeploymentStatusProps {
  status: Status;
}

const DeploymentStatus = (props: DeploymentStatusProps) => {
  const { status } = props;

  const { dotColor, dotLabel } = variant(status);

  return (
    <div className="inline-flex items-center m-1 space-x-2 reset">
      <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
      <p className="text-sm text-primary-accent-5">{dotLabel}</p>
    </div>
  );
};

export { DeploymentStatus };
