import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectModal as Component } from "./create-project-modal";

export default {
  title: "Design System/Organisms/Project/Create Project Modal",
  component: Component,
} as ComponentMeta<typeof Component>;

export const CreateProjectModal: ComponentStory<typeof Component> = (
  args
): JSX.Element => <Component {...args} />;
CreateProjectModal.args = {
  showModal: true,
};
