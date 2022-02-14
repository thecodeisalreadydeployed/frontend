import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Code as Component } from "./code";

export default {
  title: "Design System/Atoms/Code",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Code: ComponentStory<typeof Component> = (args): JSX.Element => {
  const code = `
function greeting() {
    return "Hello World";
}
  `;

  return <Component {...args} code={code} />;
};
Code.args = {
  language: "javascript",
};
