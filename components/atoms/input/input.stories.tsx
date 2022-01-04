import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Input as Component } from "./input";

export default {
  title: "DesignSystem/Atoms/Input",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Input: ComponentStory<typeof Component> = (args): JSX.Element => (
  <div className="w-60">
    <Component {...args} />
  </div>
);
Input.args = {
  size: "md",
  placeholder: "Type me...",
  type: "text",
  autoComplete: false,
};
