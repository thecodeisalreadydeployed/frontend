import { Card } from "@atoms";

interface ProjectCardProps {
  name: string;
  description?: string;
  updatedAt?: string;
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

const ProjectCard = (props: ProjectCardProps) => {
  const {
    name,
    description = "No description",
    updatedAt = "N/A",
    onClick,
  } = props;

  return (
    <Card wrapperOverride="space-y-4 reset" onClick={onClick}>
      <div className="flex items-center space-x-2 ">
        <img
          src={`https://avatars.dicebear.com/api/identicon/${name}.svg`}
          alt="Icon"
          className="w-8 h-8 rounded-full ring-2 shrink-0 ring-primary-accent-2"
        />
        <p className="w-full font-medium truncate line-clamp-2">{name}</p>
      </div>
      <p className="text-sm text-primary-accent-6">{description}</p>
      <p className="text-sm truncate line-clamp-1 text-primary-accent-4">
        {updatedAt}
      </p>
    </Card>
  );
};

export { ProjectCard };
