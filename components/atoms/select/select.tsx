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
      {({ open }) => (
        <div
          className={clsx("relative text-zinc-200", CSS.container[size])}
          id={id}
        >
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-pointer rounded-lg bg-zinc-800 pr-10 pl-3 text-left outline-none disabled:cursor-not-allowed disabled:bg-zinc-700",
              open && "ring-1 ring-inset ring-zinc-600",
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
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                aria-hidden="true"
                className="h-5 w-5 text-zinc-400"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-zinc-800 py-1 shadow-lg outline-none">
              {selectOptions?.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pr-4 pl-10 outline-none",
                      active ? "bg-zinc-600 text-zinc-100" : "text-zinc-200"
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
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
