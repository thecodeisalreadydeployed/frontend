import Image from "next/image";

import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card as Component } from "./card";

export default {
  title: "Design System/Atoms/Card",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Card: ComponentStory<typeof Component> = (args): JSX.Element => (
  <Component {...args} />
);
Card.args = {
  children: (
    <div className="w-40 h-40">
      <div className="relative h-1/2">
        <Image
          alt="Random photo"
          className="object-cover"
          layout="fill"
          src="https://picsum.photos/200/300"
        />
      </div>
      <p className="mt-4 text-center">Hello World</p>
    </div>
  ),
};
