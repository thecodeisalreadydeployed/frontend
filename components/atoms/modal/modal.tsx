import { useEffect } from "react";

interface ModalProps {
  showModal: boolean;
  onClickOutside?: () => void;
  children?: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  const { showModal, onClickOutside, children } = props;

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = showModal ? "hidden" : "auto";
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-opacity-60 backdrop-blur bg-primary-accent-3"
      onClick={onClickOutside}
    >
      <div
        className="absolute top-1/2 left-1/2 bg-primary-background rounded -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
