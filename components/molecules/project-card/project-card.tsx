import { Card } from "@atoms";
interface ProjectCardProps {
  name: string;
  updatedAt?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { name, updatedAt = "N/A", onClick } = props;

  const hash = name.replaceAll(" ", "");

  return (
    <Card onClick={onClick}>
      <div
        className="relative -mx-6 -mt-6 mb-6 h-8 bg-repeat-x opacity-60"
        style={{
          backgroundImage: `url(https://avatars.dicebear.com/api/identicon/${hash}.svg)`,
        }}
      />
      {/* Hard code h-12 (48px) due to when line clamped, it is changed from 48px to 46px */}
      <p className="mb-2 h-12 text-base font-normal text-zinc-200 break-words line-clamp-2">
        {name}
      </p>
      <p className="text-xs font-light text-zinc-400">{updatedAt}</p>
    </Card>
  );
};
