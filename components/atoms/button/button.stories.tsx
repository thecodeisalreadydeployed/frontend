import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button as ButtonComponent } from "./button";

export default {
  title: "DesignSystem/Atoms/Button",
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

export const Button: ComponentStory<typeof ButtonComponent> = (
  args
): JSX.Element => <ButtonComponent {...args} />;
Button.args = {
  children: "Button",
  color: "primary",
  size: "md",
};
