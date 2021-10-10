import { Button } from "@elements";
import { ArrowDown, ArrowUp } from "react-feather";

const Test = () => {
  return (
    <div className="p-2">
      <h1 className="text-xl font-bold">Buttons</h1>
      <h2>Size</h2>
      <div className="space-x-1">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <h2>Color</h2>
      <div className="space-x-1">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="alert">Alert</Button>
        <Button color="error">Error</Button>
        <Button color="success">Success</Button>
        <Button color="violet">Violet</Button>
        <Button color="warning">Warning</Button>
      </div>
      <h2>Variant</h2>
      <div className="space-x-1">
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
      </div>
      <h2>Icon</h2>
      <div className="space-x-1">
        <Button IconPrefix={ArrowUp} color="alert">
          Alert
        </Button>
        <Button IconSuffix={ArrowDown} color="error">
          Error
        </Button>
        <Button IconPrefix={ArrowUp} IconSuffix={ArrowDown} color="success">
          Success
        </Button>
      </div>
    </div>
  );
};

export default Test;
