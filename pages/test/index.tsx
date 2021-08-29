import { useRouter } from "next/router";
import { Button } from "@elements";

const Test = () => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push("/test/button")}>button</Button>
    </div>
  );
};

export default Test;
