import { Card } from "@atoms";

const CardDesign = () => {
  return (
    <div className="p-2 space-y-2">
      <h1 className="text-xl font-bold">Card</h1>
      <div className="space-x-1">
        <Card>Children</Card>
      </div>
    </div>
  );
};

export default CardDesign;
