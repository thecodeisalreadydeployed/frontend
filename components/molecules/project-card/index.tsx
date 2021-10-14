import { Card } from "@atoms";

interface ProjectCardProps {
  name: string;
  description?: string;
  updatedAt?: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { name, description = "No description", updatedAt = "N/A" } = props;

  return (
    <Card wrapperOverride="space-y-4 reset">
      <div className="flex items-center space-x-2 ">
        <img
          src="/favicon.ico"
          alt="Project Image"
          className="flex-shrink-0 w-8 h-8 rounded-full"
        />
        <p className="w-full font-medium line-clamp-2">{name}</p>
      </div>
      <p className="text-sm text-primary-accent-6">{description}</p>
      <p className="text-sm text-primary-accent-4">{updatedAt}</p>
    </Card>
  );
};

export { ProjectCard };
