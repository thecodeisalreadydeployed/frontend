import { Tab } from "@headlessui/react";
import clsx from "clsx";

export interface SidebarProps {
  menus: {
    name: string;
    panel: JSX.Element;
  }[];
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
  const { menus } = props;
  return (
    <Tab.Group
      as="div"
      className="flex gap-x-6 text-base font-normal text-zinc-200"
    >
      <Tab.List className="flex flex-col space-y-1 w-1/4">
        {menus.map((menu, index) => {
          return (
            <Tab
              key={`menu-name-${index}-${menu.name.toLocaleLowerCase()}`}
              className={({ selected }) =>
                clsx(
                  "py-2.5 px-4 text-sm font-bold leading-5 text-left rounded-lg outline-none",
                  selected
                    ? "bg-zinc-600 shadow"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.12]"
                )
              }
            >
              {menu.name}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels>
        {menus.map((menu, index) => {
          return (
            <Tab.Panel
              key={`menu-panel-${index}-${menu.name.toLocaleLowerCase()}`}
              className="outline-none"
            >
              {menu.panel}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};
