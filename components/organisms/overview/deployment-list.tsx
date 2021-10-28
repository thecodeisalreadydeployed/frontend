import { DeploymentSummaryRow } from "@molecules";

const DeploymentList = () => {
  return (
    <div className="container my-12 reset">
      <h2 className="text-2xl font-semibold">Deployments</h2>
      <p className="mt-3.5 mb-6 text-sm text-primary-accent-6">
        Deployments that are currently being worked on.
      </p>
      <div className="bg-primary-background rounded border divide-y border-primary-accent-2 divide-primary-accent-2">
        <DeploymentSummaryRow applicationName="Application 1" />
        <DeploymentSummaryRow applicationName="Application 2" />
        <DeploymentSummaryRow applicationName="Application 3" />
      </div>
    </div>
  );
};

export { DeploymentList };
