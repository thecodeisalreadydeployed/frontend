import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Header as Component } from "./header";

export default {
  title: "DesignSystem/Organisms/Shared/Header",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Header: ComponentStory<typeof Component> = (): JSX.Element => (
  <Component />
);
