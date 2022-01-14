import { useEffect } from "react";

import clsx from "clsx";

interface ModalProps {
  showModal: boolean;
  onClickOutside?: () => void;
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps): JSX.Element => {
  const { children, onClickOutside, showModal } = props;

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = showModal ? "hidden" : "auto";
    }
  }, [showModal]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-sm",
        !showModal && "hidden"
      )}
      onClick={onClickOutside}
    >
      <div
        className="absolute top-1/2 left-1/2 bg-zinc-800 rounded border border-zinc-600 -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
