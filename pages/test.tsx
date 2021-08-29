import { Button } from "../components/base/button";
import { ArrowUp } from "react-feather";

const Test = () => {
  return (
    <div>
      <Button size="small" text="button" Suffix={ArrowUp} />
    </div>
  );
};

export default Test;
