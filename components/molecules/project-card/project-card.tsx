import Image from "next/image";

import { Card } from "@atoms";
interface ProjectCardProps {
  projectId: string;
  name: string;
  updatedAt?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { name, onClick, projectId, updatedAt = "" } = props;

  const hash = (projectId ?? name).replaceAll(" ", "") ?? "";

  return (
    <Card onClick={onClick}>
      {/* Hard code h-12 (48px) due to when line clamped, it is changed from 48px to 46px */}
      <p className="mb-2 h-12 break-words text-base font-normal text-zinc-200 line-clamp-2">
        {name}
      </p>
      <div className="flex items-end justify-between">
        <p className="flex-1 text-xs font-light text-zinc-400">{updatedAt}</p>
        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-zinc-600">
          <Image
            alt="Randomly generated icon"
            layout="fill"
            src={`https://avatars.dicebear.com/api/identicon/${hash}.svg`}
          />
        </div>
      </div>
    </Card>
  );
};
