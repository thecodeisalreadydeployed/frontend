import { useState } from "react";

import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "@atoms";

import { Select as Component, SelectOption } from "./select";

export default {
  title: "Design System/Atoms/Select",
  component: Component,
} as ComponentMeta<typeof Component>;

const selectOptions: Array<SelectOption<string>> = [
  { id: "0", name: "Durward Reynolds", value: "0" },
  { id: "1", name: "Kenton Towne", value: "1" },
  { id: "2", name: "Therese Wunsch", value: "2" },
  { id: "3", name: "Benedict Kessler", value: "3" },
  { id: "4", name: "Katelyn Rohan", value: "4" },
  { id: "5", name: "Therese Wunsch", value: "5" },
  { id: "6", name: "Benedict Kessler", value: "6" },
  { id: "7", name: "Katelyn Rohan", value: "7" },
  { id: "8", name: "Therese Wunsch", value: "8" },
  { id: "9", name: "Benedict Kessler", value: "9" },
  { id: "10", name: "Katelyn Rohan", value: "10" },
];

export const Select: ComponentStory<typeof Component> = (args): JSX.Element => (
  <div className="w-60">
    <Component {...args} />
  </div>
);
Select.args = {
  size: "md",
  selectOptions: selectOptions,
};

export const SelectWithValue: ComponentStory<typeof Component> = (
  args
): JSX.Element => {
  const [selectOption, setSelectOption] = useState<SelectOption<string>>();

  return (
    <div className="space-y-2 w-60">
      <Component
        {...(args as unknown)}
        value={selectOption}
        onChangeSelection={(newValue) => setSelectOption(newValue)}
      />

      <Button fullWidth onClick={() => setSelectOption(selectOptions[0])}>
        Change to Index 0
      </Button>
    </div>
  );
};
SelectWithValue.args = {
  size: "md",
  selectOptions: selectOptions,
};
