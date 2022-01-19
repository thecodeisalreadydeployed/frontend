import { Fragment, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import clsx from "clsx";

type SelectSize = "sm" | "md" | "lg";

export type SelectOption = {
  id: number;
  name: string;
  value: string;
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

interface SelectProps {
  disabled?: boolean;
  id?: string;
  onChangeSelection?: (newSelection: SelectOption) => void;
  placeholder?: string;
  size?: SelectSize;
  value?: SelectOption;
  initialValue?: SelectOption;
  selectOptions?: Array<SelectOption>;
}

export const Select = (props: SelectProps): JSX.Element => {
  const {
    disabled = false,
    id,
    initialValue,
    onChangeSelection = () => null,
    placeholder = "Select",
    selectOptions = [],
    size = "md",
    value: outsideValue = undefined,
  } = props;

  const [selected, setSelected] = useState<SelectOption | undefined>(
    initialValue
  );

  const value = outsideValue ?? selected;

  return (
    <Listbox
      disabled={disabled}
      value={value}
      onChange={(newSelection) => {
        if (newSelection === undefined) return;
        setSelected(newSelection);
        onChangeSelection(newSelection);
      }}
    >
      <div
        className={clsx("relative text-zinc-200", CSS.container[size])}
        id={id}
      >
        <Listbox.Button
          className={clsx(
            "relative pr-10 pl-3 w-full text-left bg-zinc-800 rounded-lg border border-zinc-600 outline-none cursor-pointer",
            CSS.listBoxButton[size]
          )}
        >
          <span
            className={clsx(
              "block truncate",
              placeholder && value === undefined && "text-zinc-400"
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
            {selectOptions.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  clsx(
                    "relative py-2 pr-4 pl-10 outline-none cursor-pointer select-none",
                    active ? "text-zinc-100 bg-zinc-600" : "text-zinc-200"
                  )
                }
                value={option}
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
