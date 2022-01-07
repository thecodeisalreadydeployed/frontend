import type { ComponentMeta, ComponentStory } from "@storybook/react";

// import { Project as FetchedProject } from "types/api-schema";
import { Header as Component } from "./header";

export default {
  title: "DesignSystem/Organisms/Shared/Header",
  component: Component,
} as ComponentMeta<typeof Component>;

export const Header: ComponentStory<typeof Component> = (): JSX.Element => (
  <div className="absolute inset-x-2">
    <Component />
  </div>
);

// const projects: Promise<Array<FetchedProject>> = fetch(
//   "http://localhost:3001/projects/list"
// ).then((data) => data.json());

Header.parameters = {
  nextRouter: {
    query: {
      // Hard coded for now
      project: "prj-HMYGoBdTEcVeXghhoIYVMZruY",
      application: "app-tTllqWFToCbBYlCFIDjoPmlCd",
    },
  },
};
