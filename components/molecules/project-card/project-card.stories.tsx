import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectCard as ProjectCardComponent } from "./project-card";

export default {
  title: "DesignSystem/Molecules/Project Card",
  component: ProjectCardComponent,
} as ComponentMeta<typeof ProjectCardComponent>;

export const ProjectCard: ComponentStory<typeof ProjectCardComponent> = (
  args
): JSX.Element => <ProjectCardComponent {...args} />;
ProjectCard.args = {
  name: "This is a Project Title",
  updatedAt: "in about 5 minutes",
};
