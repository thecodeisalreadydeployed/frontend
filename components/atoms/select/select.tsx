import { Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type SelectSize = "sm" | "md" | "lg";

export type SelectOption<T> = {
  id: string;
  name: string;
  value: T;
};

interface CSSProps {
  listBoxButton: Record<SelectSize, string>;
  container: Record<SelectSize, string>;
}
const CSS: CSSProps = {
  listBoxButton: {
    sm: clsx("py-1.5"),
    md: clsx("py-2.5"),
    lg: clsx("py-3"),
  },
  container: {
    sm: clsx("text-sm"),
    md: clsx("text-sm"),
    lg: clsx("text-base"),
  },
};

interface SelectProps<T> {
  disabled?: boolean;
  id?: string;
  onChangeSelection?: (newSelection: SelectOption<T> | undefined) => void;
  placeholder?: string;
  size?: SelectSize;
  value?: SelectOption<T>;
  selectOptions?: Array<SelectOption<T>>;
}

export const Select = <T,>(props: SelectProps<T>): JSX.Element => {
  const {
    disabled = false,
    id,
    onChangeSelection = () => null,
    placeholder = "Select",
    selectOptions,
    size = "md",
    value,
  } = props;

  return (
    <Listbox
      disabled={disabled}
      value={value?.id}
      onChange={(id) => {
        onChangeSelection(
          id ? selectOptions?.find((option) => option.id === id) : undefined
        );
      }}
    >
      <div
        className={clsx("relative text-zinc-200", CSS.container[size])}
        id={id}
      >
        <Listbox.Button
          className={clsx(
            "relative pr-10 pl-3 w-full text-left bg-zinc-800 rounded-lg border border-zinc-600 outline-none cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-700",
            CSS.listBoxButton[size]
          )}
        >
          <span
            className={clsx(
              "block truncate",
              disabled
                ? value === undefined
                  ? "text-zinc-700"
                  : "text-zinc-400"
                : placeholder && value === undefined && "text-zinc-600"
            )}
          >
            {value?.name ?? placeholder}
          </span>
          <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
            <SelectorIcon
              aria-hidden="true"
              className="w-5 h-5 text-zinc-400"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-40 bg-zinc-800 rounded-md border border-zinc-600 outline-none shadow-lg">
            {selectOptions?.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  clsx(
                    "relative py-2 pr-4 pl-10 outline-none cursor-pointer select-none",
                    active ? "text-zinc-100 bg-zinc-600" : "text-zinc-200"
                  )
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block truncate",
                        selected ? "font-bold" : "font-normal"
                      )}
                    >
                      {option.name}
                    </span>
                    {selected && (
                      <span className="flex absolute inset-y-0 left-0 items-center pl-3 text-zinc-400">
                        <CheckIcon aria-hidden="true" className="w-5 h-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
