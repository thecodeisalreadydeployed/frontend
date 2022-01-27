import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateApplicationModal as Component } from "./create-application-modal";

export default {
  title: "Design System/Organisms/Application/Create Application Modal",
  component: Component,
} as ComponentMeta<typeof Component>;

export const CreateApplicationModal: ComponentStory<typeof Component> = (
  args
): JSX.Element => <Component {...args} />;
CreateApplicationModal.args = {
  showModal: true,
};
