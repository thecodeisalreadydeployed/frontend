import { DeploymentState } from "types/schema";

interface KProps {
  label: Record<DeploymentState, string>;
}

const K: KProps = {
  label: {
    [DeploymentState.DeploymentStateQueueing]: "Queueing",
    [DeploymentState.DeploymentStateBuilding]: "Building",
    [DeploymentState.DeploymentStateBuildSucceeded]: "Build Succeeded",
    [DeploymentState.DeploymentStateCommitted]: "Initializing",
    [DeploymentState.DeploymentStateReady]: "Ready",
    [DeploymentState.DeploymentStateError]: "Error",
  },
};

export const mapDeploymentStateTitle = (state: DeploymentState): string => {
  return K.label[state];
};
