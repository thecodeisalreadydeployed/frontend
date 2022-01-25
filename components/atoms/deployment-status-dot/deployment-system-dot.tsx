import clsx from "clsx";

export type Status = "ready" | "error" | "building" | "queueing";

interface CSSProps {
  dot: Record<Status, string>;
}

const CSS: CSSProps = {
  dot: {
    building: clsx("bg-yellow-400"),
    error: clsx("bg-red-400"),
    queueing: clsx("bg-yellow-400"),
    ready: clsx("bg-green-400"),
  },
};

interface KProps {
  label: Record<Status, string>;
}

const K: KProps = {
  label: {
    building: "Building",
    error: "Error",
    queueing: "Queueing",
    ready: "Ready",
  },
};

interface DeploymentStatusDotProps {
  status: Status;
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
