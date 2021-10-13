import { Input } from "@elements";

const InputDesign = () => {
  return (
    <div className="p-2 space-y-2">
      <h1 className="text-xl font-bold">Inputs</h1>
      <h2>Size</h2>
      <div className="space-x-1 ">
        <Input size="sm" placeholder="sm" />
        <Input size="md" placeholder="md" />
        <Input size="lg" placeholder="lg" />
      </div>
      <h2>Width</h2>
      <div className="flex flex-col space-y-1">
        <Input size="sm" placeholder="w-auto" />
        <Input size="lg" width="w-1/4" placeholder="w-1/4" />
        <Input size="md" width="w-1/2" placeholder="w-1/2" />
        <Input size="sm" width="w-full" placeholder="w-full" />
      </div>
      <h2>Disabled</h2>
      <div className="flex flex-col space-y-1">
        <Input size="sm" placeholder="Disabled" disabled />
      </div>
    </div>
  );
};

export default InputDesign;
