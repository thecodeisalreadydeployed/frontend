import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { NavBreadcrumb as Component } from "./nav-breadcrumb";

export default {
  title: "Design System/Molecules/Nav Breadcrumb",
  component: Component,
} as ComponentMeta<typeof Component>;

export const NavBreadcrumb: ComponentStory<typeof Component> = (
  args
): JSX.Element => <Component {...args} />;
NavBreadcrumb.args = {
  projectName: "Project Name",
  applicationName: "Application Name",
};
