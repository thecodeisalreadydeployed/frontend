import Image from "next/image";

import { Card } from "@atoms";
interface ProjectCardProps {
  projectId: string;
  name: string;
  updatedAt?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ProjectCard = (props: ProjectCardProps): JSX.Element => {
  const { projectId, name, updatedAt = "", onClick } = props;

  const hash = (projectId ?? name).replaceAll(" ", "") ?? "";

  return (
    <Card onClick={onClick}>
      {/* Hard code h-12 (48px) due to when line clamped, it is changed from 48px to 46px */}
      <p className="mb-2 h-12 text-base font-normal text-zinc-200 break-words line-clamp-2">
        {name}
      </p>
      <div className="flex justify-between items-end">
        <p className="flex-1 text-xs font-light text-zinc-400">{updatedAt}</p>
        <div className="overflow-hidden relative w-8 h-8 rounded-full ring-2 ring-zinc-600">
          <Image
            src={`https://avatars.dicebear.com/api/identicon/${hash}.svg`}
            layout="fill"
            alt="Randomly generated icon"
          />
        </div>
      </div>
    </Card>
  );
};
