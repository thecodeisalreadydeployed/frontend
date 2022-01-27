import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Tab as Component } from "./tab";

export default {
  title: "Design System/Atoms/Tab",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Tab: ComponentStory<typeof Component> = (args): JSX.Element => (
  <div className="w-full">
    <Component {...args} />
  </div>
);
Tab.args = {
  tabs: [
    { name: "Tab 1", panel: <div>Page 1</div> },
    { name: "Tab 2", panel: <div>Page 2</div> },
    { name: "Tab 3", panel: <div>Page 3</div> },
  ],
};
