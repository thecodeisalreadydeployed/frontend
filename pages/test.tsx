import { Button } from "../components/base/button";
import { ArrowUp } from "react-feather";

const Test = () => {
  return (
    <div className="">
      border
      <Button
        size="small"
        text="button"
        Suffix={ArrowUp}
        color="primary"
        type="border"
      />
      <Button
        size="medium"
        text="button"
        Suffix={ArrowUp}
        color="secondary"
        type="border"
      />
      <Button
        size="large"
        text="button"
        Suffix={ArrowUp}
        color="success"
        type="border"
      />
      <Button
        size="medium"
        text="button"
        Suffix={ArrowUp}
        color="warning"
        type="border"
      />
      ghost
      <Button
        size="small"
        text="button"
        Suffix={ArrowUp}
        color="primary"
        type="ghost"
      />
      <Button
        size="medium"
        text="button"
        Suffix={ArrowUp}
        color="secondary"
        type="ghost"
      />
      <Button
        size="large"
        text="button"
        Suffix={ArrowUp}
        color="success"
        type="ghost"
      />
      <Button
        size="medium"
        text="button"
        Suffix={ArrowUp}
        color="warning"
        type="ghost"
      />
      <Button
        size="medium"
        text="button"
        Suffix={ArrowUp}
        color="alert"
        type="ghost"
      />
    </div>
  );
};

export default Test;
