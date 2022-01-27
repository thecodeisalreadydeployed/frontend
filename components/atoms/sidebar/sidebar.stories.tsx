import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Sidebar as Component } from "./sidebar";

export default {
  title: "Design System/Atoms/Sidebar",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Sidebar: ComponentStory<typeof Component> = (
  args
): JSX.Element => (
  <div className="w-screen">
    <Component {...args} />
  </div>
);
Sidebar.args = {
  menus: [
    { name: "Menu 1", panel: <div>Page 1</div> },
    { name: "Menu 2", panel: <div>Page 2</div> },
    { name: "Menu 3", panel: <div>Page 3</div> },
  ],
};
