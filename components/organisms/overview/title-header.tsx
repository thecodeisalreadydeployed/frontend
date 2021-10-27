import { Button } from "@atoms";

interface TitleHeaderProps {
  applicationTitle?: string;
}

const TitleHeader = (props: TitleHeaderProps) => {
  const { applicationTitle } = props;

  return (
    <div className="h-32 bg-primary-background border-b reset border-primary-accent-2">
      <div className="container flex justify-between items-center h-full">
        <h1 className="text-3xl font-medium">{applicationTitle}</h1>
        <div className="space-x-4">
          <Button color="secondary">Connect Git Repository</Button>
          <Button>Visit</Button>
        </div>
      </div>
    </div>
  );
};

export { TitleHeader };
