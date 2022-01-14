import { useArgs } from "@storybook/client-api";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "@atoms";

import { Modal as Component } from "./modal";

export default {
  title: "Design System/Atoms/Modal",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Modal: ComponentStory<typeof Component> = (args): JSX.Element => {
  const [, setArgs] = useArgs();

  const handleCloseModal = () => {
    setArgs({ ...args, showModal: false });
  };

  return (
    <div className="absolute inset-2 bg-zinc-400">
      <Component {...args} onClickOutside={handleCloseModal}>
        <div className="p-4">
          <p>Hello World</p>
          <Button onClick={handleCloseModal}>Close Modal</Button>
        </div>
      </Component>
    </div>
  );
};

Modal.args = {
  showModal: true,
};
