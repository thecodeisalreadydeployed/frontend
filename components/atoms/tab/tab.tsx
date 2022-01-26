import { Tab as HeadlessTab } from "@headlessui/react";
import clsx from "clsx";

export interface TabProps {
  tabs: {
    name: string;
    panel: JSX.Element;
  }[];
}

export const Tab = (props: TabProps): JSX.Element => {
  const { tabs } = props;
  return (
    <HeadlessTab.Group>
      <HeadlessTab.List className="flex p-1 mb-6 space-x-1 text-base font-normal text-zinc-200 bg-zinc-700/30 rounded-lg">
        {tabs.map((tab, index) => {
          return (
            <HeadlessTab
              key={`tab-name-${index}-${tab.name.toLocaleLowerCase()}`}
              className={({ selected }) =>
                clsx(
                  "py-2.5 px-4 text-sm font-bold leading-5 rounded-lg outline-none",
                  selected
                    ? "bg-zinc-600 shadow"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.12]"
                )
              }
            >
              {tab.name}
            </HeadlessTab>
          );
        })}
      </HeadlessTab.List>
      <HeadlessTab.Panels>
        {tabs.map((tab, index) => {
          return (
            <HeadlessTab.Panel
              key={`tab-panel-${index}-${tab.name.toLocaleLowerCase()}`}
              className="outline-none"
            >
              {tab.panel}
            </HeadlessTab.Panel>
          );
        })}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
};
