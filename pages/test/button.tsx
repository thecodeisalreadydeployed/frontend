import { Button } from "@elements";
import { ArrowDown, ArrowUp } from "react-feather";

const Test = () => {
  return (
    <div className="p-2 space-y-2">
      <h1 className="text-xl font-bold">Buttons</h1>
      <h2>Size</h2>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <h2>Color</h2>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="alert">Alert</Button>
      <Button color="error">Error</Button>
      <Button color="success">Success</Button>
      <Button color="violet">Violet</Button>
      <Button color="warning">Warning</Button>
      <h2>Variant</h2>
      <Button variant="border" color="primary">
        Border
      </Button>
      <Button variant="border" color="warning">
        Border
      </Button>
      <Button variant="ghost" color="alert">
        Ghost
      </Button>
      <Button variant="ghost" color="error">
        Ghost
      </Button>
      <h2>Icon</h2>
      <Button Prefix={ArrowUp} color="alert">
        Alert
      </Button>
      <Button Suffix={ArrowDown} color="error">
        Error
      </Button>
      <Button Prefix={ArrowUp} Suffix={ArrowDown} color="success">
        Success
      </Button>
    </div>
  );
};

export default Test;
