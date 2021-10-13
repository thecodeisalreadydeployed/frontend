import { useRouter } from "next/router";
import { Button } from "@elements";

const Test = () => {
  const router = useRouter();

  return (
    <div className="space-x-2">
      <Button onClick={() => router.push("/test/button")}>Button</Button>
      <Button onClick={() => router.push("/test/input")}>Input</Button>
    </div>
  );
};

export default Test;
