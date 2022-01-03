import { Card } from "@atoms";
interface ProjectCardProps {
  name: string;
  description?: string;
  updatedAt?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { name, updatedAt = "N/A", onClick } = props;

  return (
    <Card onClick={onClick}>
      <div
        className="relative -mx-6 -mt-6 mb-6 h-8 bg-repeat-x opacity-60"
        style={{
          backgroundImage: `url(https://avatars.dicebear.com/api/identicon/${name}.svg)`,
        }}
      />
      <p className="mb-2 text-base font-normal text-zinc-200 truncate">
        {name}
      </p>
      <p className="text-xs font-light text-zinc-400">{updatedAt}</p>
    </Card>
  );
};
