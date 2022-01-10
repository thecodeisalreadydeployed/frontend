import { useState } from "react";

import { useCreateNewProject } from "service/projects";

import { Button, Input, Modal } from "@atoms";

interface CreateProjectModalProps {
  onClose?: () => void;
  showModal: boolean;
}

enum BUTTON_ID {
  NEXT = "next-button",
  CANCEL = "cancel-button",
}

enum INPUT_ID {
  PRJ_NAME = "project-name-input",
}

export const CreateProjectModal = (
  props: CreateProjectModalProps
): JSX.Element => {
  const { showModal: visible, onClose: close = () => null } = props;
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
        close();
        break;
      case BUTTON_ID.NEXT:
        await createNewProject(newProjectName);
        close();

        break;
    }
  };

  return (
    <Modal showModal={visible} onClickOutside={close}>
      <div className="w-screen max-w-[28rem] text-base font-normal text-zinc-200">
        <div className="p-6">
          <p className="mb-6 font-bold">New Project</p>
          <label htmlFor={INPUT_ID.PRJ_NAME} className="block mb-3 text-sm">
            Name
          </label>
          <Input
            id={INPUT_ID.PRJ_NAME}
            size="sm"
            placeholder="ie: TheCodeIsAlreadyDead"
            value={newProjectName}
            onChange={handleOnChangeInput}
          />
        </div>

        <div className="flex justify-end py-4 px-6 space-x-4">
          <Button
            id={BUTTON_ID.CANCEL}
            onClick={handleOnClickButton}
            color="secondary"
            fullWidth
          >
            Cancel
          </Button>
          <Button id={BUTTON_ID.NEXT} onClick={handleOnClickButton} fullWidth>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};
