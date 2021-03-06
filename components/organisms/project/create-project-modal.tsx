import { useState } from "react";

import { useCreateNewProject } from "services";

import { Button, Input, Modal } from "@atoms";

interface CreateProjectModalProps {
  onClose?: () => void;
  showModal: boolean;
}

enum BUTTON_ID {
  NEXT = "create-project-modal-next-button",
  CANCEL = "create-project-modal-cancel-button",
}

enum INPUT_ID {
  PRJ_NAME = "project-name-input",
}

export const CreateProjectModal = (
  props: CreateProjectModalProps
): JSX.Element => {
  const { showModal: visible, onClose: closeModal = () => null } = props;
  const [newProjectName, setNewProjectName] = useState("");
  const { createNewProject } = useCreateNewProject();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const newValue = e.currentTarget.value;

    switch (id) {
      case INPUT_ID.PRJ_NAME:
        setNewProjectName(newValue);
        break;
    }
  };

  const handleOnClickButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    switch (id) {
      case BUTTON_ID.CANCEL:
        closeModal();
        setNewProjectName("");
        break;
      case BUTTON_ID.NEXT:
        await createNewProject(newProjectName);
        closeModal();
        setNewProjectName("");
        break;
    }
  };

  return (
    <Modal
      isOpen={visible}
      onClose={() => {
        closeModal();
        setNewProjectName("");
      }}
    >
      <div className="w-screen max-w-[28rem] text-base font-normal text-zinc-200">
        <div className="p-6">
          <p className="mb-6 font-bold">New Project</p>
          <label className="mb-1 block text-sm" htmlFor={INPUT_ID.PRJ_NAME}>
            Name
          </label>
          <Input
            id={INPUT_ID.PRJ_NAME}
            placeholder="ie: TheCodeIsAlreadyDead"
            value={newProjectName}
            onChange={handleOnChangeInput}
          />
        </div>

        <div className="flex justify-end gap-x-6 py-4 px-6">
          <Button
            fullWidth
            id={BUTTON_ID.CANCEL}
            type="outline"
            onClick={handleOnClickButton}
          >
            Cancel
          </Button>
          <Button fullWidth id={BUTTON_ID.NEXT} onClick={handleOnClickButton}>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};
