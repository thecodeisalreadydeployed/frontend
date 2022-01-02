import { useState } from "react";
import { Modal, Input, Button } from "@atoms";

interface CreateApplicationModalProps {
  onClose?: () => void;
  showModal: boolean;
}

enum ApplicationInput {
  PROJECT_ID = "application-project-id",
  NAME = "application-name",
  REPO_URL = "application-repository-url",
  BUILD_SCRIPT = "application-build-script",
  INSTALL_CMD = "application-install-command",
  BUILD_CMD = "application-build-command",
  OUTPUT_DIR = "application-output-directory",
  START_COMMAND = "application-start-command",
  COMMIT_SHA = "application-commit-sha",
}

const CreateApplicationModal = (props: CreateApplicationModalProps) => {
  const { onClose: closeModal = () => null, showModal } = props;

  const [currentStep, setCurrentStep] = useState(0);

  const [applicationProjectId, setApplicationProjectId] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [applicationRepoUrl, setApplicationRepoUrl] = useState("");
  const [applicationBuildScript, setApplicationBuildScript] = useState("");
  const [applicationInstallCommand, setApplicationInstallCommand] =
    useState("");
  const [applicationBuildCommand, setApplicationBuildCommand] = useState("");
  const [applicationOutputDirectory, setApplicationOutputDirectory] =
    useState("");
  const [applicationStartCommand, setApplicationStartCommand] = useState("");
  const [applicationCommitSha, setApplicationCommitSha] = useState("");

  const resetInput = () => {
    setApplicationProjectId("");
    setApplicationName("");
    setApplicationRepoUrl("");
    setApplicationBuildScript("");
    setApplicationInstallCommand("");
    setApplicationBuildCommand("");
    setApplicationOutputDirectory("");
    setApplicationStartCommand("");
    setApplicationCommitSha("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case ApplicationInput.PROJECT_ID:
        setApplicationProjectId(value);
        return;
      case ApplicationInput.NAME:
        setApplicationName(value);
        return;
      case ApplicationInput.REPO_URL:
        setApplicationRepoUrl(value);
        return;
      case ApplicationInput.BUILD_SCRIPT:
        setApplicationBuildScript(value);
        return;
      case ApplicationInput.INSTALL_CMD:
        setApplicationInstallCommand(value);
        return;
      case ApplicationInput.BUILD_CMD:
        setApplicationBuildCommand(value);
        return;
      case ApplicationInput.OUTPUT_DIR:
        setApplicationOutputDirectory(value);
        return;
      case ApplicationInput.START_COMMAND:
        setApplicationStartCommand(value);
        return;
      case ApplicationInput.COMMIT_SHA:
        setApplicationCommitSha(value);
        return;
    }
  };

  const handlePrimaryButtonClick = () => {
    if (currentStep === 0) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleSecondaryButtonClick = () => {
    if (currentStep === 0) {
      closeModal();
      resetInput();
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const StepOne = (
    <div>
      <p className="mb-3">Project ID</p>
      <Input
        id={ApplicationInput.PROJECT_ID}
        value={applicationProjectId}
        onChange={handleInputChange}
      />
      <p className="mb-3">Name</p>
      <Input
        id={ApplicationInput.NAME}
        value={applicationName}
        onChange={handleInputChange}
      />
      <p className="mb-3">Repository URL</p>
      <Input
        id={ApplicationInput.REPO_URL}
        value={applicationRepoUrl}
        onChange={handleInputChange}
      />
    </div>
  );

  const StepTwo = (
    <div className="flex space-x-4">
      <div className="flex-1">
        <p className="mb-3">Build Script</p>
        <Input
          id={ApplicationInput.BUILD_SCRIPT}
          value={applicationBuildScript}
          onChange={handleInputChange}
        />
        <p className="mb-3">Output Directory</p>
        <Input
          id={ApplicationInput.OUTPUT_DIR}
          value={applicationOutputDirectory}
          onChange={handleInputChange}
        />
        <p className="mb-3">Commit SHA</p>
        <Input
          id={ApplicationInput.COMMIT_SHA}
          value={applicationCommitSha}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex-1">
        <p className="mb-3">Install Command</p>
        <Input
          id={ApplicationInput.INSTALL_CMD}
          value={applicationInstallCommand}
          onChange={handleInputChange}
        />
        <p className="mb-3">Build Command</p>
        <Input
          id={ApplicationInput.BUILD_CMD}
          value={applicationBuildCommand}
          onChange={handleInputChange}
        />
        <p className="mb-3">Start Command</p>
        <Input
          id={ApplicationInput.START_COMMAND}
          value={applicationStartCommand}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  return (
    <Modal
      onClickOutside={() => {
        closeModal();
        resetInput();
      }}
      showModal={showModal}
    >
      <div className="w-[90vw] lg:w-[446px]">
        <div className="p-6">
          <div className="flex mb-6">
            <p className="">New Application</p>
          </div>
          {currentStep === 0 && StepOne}
          {currentStep === 1 && StepTwo}
        </div>
        <div className="flex justify-end py-4 px-6 space-x-4">
          <Button
            variant="ghost"
            onClick={handleSecondaryButtonClick}
            fullWidth
          >
            {currentStep === 0 ? "Cancel" : "Back"}
          </Button>
          <Button onClick={handlePrimaryButtonClick} fullWidth>
            {currentStep === 1 ? "Create" : "Next"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { CreateApplicationModal };
