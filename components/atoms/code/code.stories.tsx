import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Code as Component } from "./code";

export default {
  title: "Design System/Atoms/Code",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Code: ComponentStory<typeof Component> = (args): JSX.Element => {
  return <Component {...args} />;
};

const code = `function greeting() {
    return "Hello World";
}`;

Code.args = {
  language: "javascript",
  code: code,
};
