import clsx from "clsx";

import { DeploymentState } from "types/schema";

interface CSSProps {
  dot: Record<DeploymentState, string>;
}

const CSS: CSSProps = {
  dot: {
    [DeploymentState.DeploymentStateQueueing]: clsx("bg-yellow-400"),
    [DeploymentState.DeploymentStateBuilding]: clsx("bg-yellow-400"),
    [DeploymentState.DeploymentStateBuildSucceeded]: clsx("bg-blue-400"),
    [DeploymentState.DeploymentStateCommitted]: clsx("bg-blue-400"),
    [DeploymentState.DeploymentStateReady]: clsx("bg-green-400"),
    [DeploymentState.DeploymentStateError]: clsx("bg-red-400"),
  },
};

interface KProps {
  label: Record<DeploymentState, string>;
}

const K: KProps = {
  label: {
    [DeploymentState.DeploymentStateQueueing]: "Queueing",
    [DeploymentState.DeploymentStateBuilding]: "Building",
    [DeploymentState.DeploymentStateBuildSucceeded]: "Build Succeeded",
    [DeploymentState.DeploymentStateCommitted]: "Committed",
    [DeploymentState.DeploymentStateReady]: "Ready",
    [DeploymentState.DeploymentStateError]: "Error",
  },
};

interface DeploymentStatusDotProps {
  status: DeploymentState;
}

const DeploymentStatusDot = (props: DeploymentStatusDotProps): JSX.Element => {
  const { status } = props;

  return (
    <div className="inline-flex items-center space-x-2">
      <div className={clsx("w-2.5 h-2.5 rounded-full", CSS.dot[status])} />
      <p className="text-sm text-zinc-200">{K.label[status]}</p>
    </div>
  );
};

export { DeploymentStatusDot };
