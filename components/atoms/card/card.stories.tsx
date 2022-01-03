import Image from "next/image";

import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card as CardComponent } from "./card";

export default {
  title: "DesignSystem/Atoms/Card",
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

export const Card: ComponentStory<typeof CardComponent> = (
  args
): JSX.Element => <CardComponent {...args} />;
Card.args = {
  children: (
    <div className="w-40 h-40">
      <div className="relative h-1/2">
        <Image
          src="https://picsum.photos/200/300"
          layout="fill"
          className="object-fill"
          alt="Random photo"
        />
      </div>
      <p className="mt-4 text-center">Hello World</p>
    </div>
  ),
};
