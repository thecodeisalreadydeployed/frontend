import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickOutside?: () => void;
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps): JSX.Element => {
  const { children, isOpen, onClose: closeModal } = props;

  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog
        as="div"
        className="overflow-y-auto fixed inset-0 z-10"
        onClose={closeModal}
      >
        <div className="px-4 min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            aria-hidden="true"
            className="inline-block h-screen align-middle"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block overflow-hidden relative p-4 my-8 text-left align-middle bg-zinc-800 rounded-2xl shadow-xl transition-all">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
