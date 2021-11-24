import { Status } from "./index";

const variant = (status: Status) => {
  let tw_dotColor = "";
  let vl_dotLabel = "";

  switch (status) {
    case "ready":
      tw_dotColor = "bg-cyan";
      vl_dotLabel = "Ready";
      break;
    case "error":
      tw_dotColor = "bg-error";
      vl_dotLabel = "Error";
      break;
    case "building":
      tw_dotColor = "bg-warning";
      vl_dotLabel = "Building";
      break;
    case "queueing":
      tw_dotColor = "bg-warning";
      vl_dotLabel = "Queueing";
      break;
  }

  return {
    dotColor: tw_dotColor,
    dotLabel: vl_dotLabel,
  };
};

export { variant };
