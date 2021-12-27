import { useState } from "react";
import { Modal, Input } from "@atoms";

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

  return (
    <Modal onClickOutside={closeModal} showModal={showModal}>
      <div className="p-6">
        <div className="flex mb-6">
          <p className="">New Application</p>
        </div>
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
        <p className="mb-3">Start Commnad</p>
        <Input
          id={ApplicationInput.START_COMMAND}
          value={applicationStartCommand}
          onChange={handleInputChange}
        />
        <p className="mb-3">Commit SHA</p>
        <Input
          id={ApplicationInput.COMMIT_SHA}
          value={applicationCommitSha}
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export { CreateApplicationModal };
