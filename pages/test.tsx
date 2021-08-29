import { Button } from "../components/base/button";
import { ArrowUp } from "react-feather";

const Test = () => {
  return (
    <div>
      <Button size="small" text="button" Suffix={ArrowUp} color="primary" />
      <Button size="medium" text="button" Suffix={ArrowUp} color="secondary" />
      <Button size="large" text="button" Suffix={ArrowUp} color="success" />
      <Button size="medium" text="button" Suffix={ArrowUp} color="warning" />
    </div>
  );
};

export default Test;
