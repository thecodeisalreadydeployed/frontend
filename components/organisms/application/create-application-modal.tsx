import { useEffect, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/outline";
import { useCreateNewApplication } from "services";
import useSWR from "swr";
import { useParseBuildScript } from "utils/use-parse-build-script";
import { useScrollToBottom } from "utils/useScrollToBottom";

import { Button, Code, Input, Modal, Select, SelectOption } from "@atoms";
import type { Preset } from "types/schema";

interface CreateApplicationModalProps {
  onClose?: () => void;
  showModal: boolean;
  projectId: string;
}

enum BUTTON_ID {
  NEXT = "create-application-modal-next-button",
  CANCEL = "create-application-modal-cancel-button",
}

enum INPUT_ID {
  APP_NAME = "application-name",
  REPO_URL = "application-repository-url",
  BUILD_SCRIPT = "application-build-script",
  INSTALL_CMD = "application-install-command",
  BUILD_CMD = "application-build-command",
  OUTPUT_DIR = "application-output-directory",
  START_COMMAND = "application-start-command",
  BRANCH = "application-branch",
}

export const CreateApplicationModal = (
  props: CreateApplicationModalProps
): JSX.Element => {
  const { onClose: closeModal = () => null, showModal, projectId } = props;

  const { data: presetsData } = useSWR<Preset[]>(
    process.env.NEXT_PUBLIC_HOST + "/presets/list"
  );

  const selectOptions = presetsData?.map((data) => ({
    id: data.id,
    name: data.name,
    value: data.template,
  }));

  const { createNewApplication } = useCreateNewApplication();

  const [applicationName, setApplicationName] = useState("");
  const [applicationRepoUrl, setApplicationRepoUrl] = useState("");
  const [applicationBuildScript, setApplicationBuildScript] = useState<
    SelectOption<string> | undefined
  >();
  const [applicationInstallCommand, setApplicationInstallCommand] =
    useState("");
  const [applicationBuildCommand, setApplicationBuildCommand] = useState("");
  const [applicationOutputDirectory, setApplicationOutputDirectory] =
    useState("");
  const [applicationStartCommand, setApplicationStartCommand] = useState("");
  const [applicationBranch, setApplicationBranch] = useState("");

  const [inputContainerRef, isInputContainerScrolledToBottom] =
    useScrollToBottom();

  const resetInput = () => {
    setApplicationName("");
    setApplicationRepoUrl("");
    setApplicationBuildScript(undefined);
    setApplicationInstallCommand("");
    setApplicationBuildCommand("");
    setApplicationOutputDirectory("");
    setApplicationStartCommand("");
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case INPUT_ID.APP_NAME:
        setApplicationName(value);
        break;
      case INPUT_ID.REPO_URL:
        setApplicationRepoUrl(value);
        break;
      case INPUT_ID.INSTALL_CMD:
        setApplicationInstallCommand(value);
        break;
      case INPUT_ID.BUILD_CMD:
        setApplicationBuildCommand(value);
        break;
      case INPUT_ID.OUTPUT_DIR:
        setApplicationOutputDirectory(value);
        break;
      case INPUT_ID.START_COMMAND:
        setApplicationStartCommand(value);
        break;
      case INPUT_ID.BRANCH:
        setApplicationBranch(value);
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
        resetInput();
        break;
      case BUTTON_ID.NEXT:
        createNewApplication({
          branch: applicationBranch,
          buildCommand: applicationBuildCommand,
          buildScript: applicationBuildScript?.value ?? "",
          installCommand: applicationInstallCommand,
          name: applicationName,
          outputDirectory: applicationOutputDirectory,
          projectId: projectId,
          repositoryURL: applicationRepoUrl,
          startCommand: applicationStartCommand,
        });
        closeModal();
        resetInput();
        break;
    }
  };

  const { parsedBuildScript } = useParseBuildScript(
    applicationBuildScript?.value,
    {
      buildCommand: applicationBuildCommand,
      installCommand: applicationInstallCommand,
      outputDirectory: applicationOutputDirectory,
      startCommand: applicationStartCommand,
    }
  );

  const [customScript, setCustomScript] = useState("");

  useEffect(() => {
    setCustomScript(parsedBuildScript);
  }, [parsedBuildScript]);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        closeModal();
        resetInput();
      }}
    >
      <div className="flex overflow-hidden flex-col w-screen max-w-[56rem] h-screen max-h-[30rem] text-base font-normal text-zinc-200">
        <div className="flex flex-col p-6 min-h-0">
          <p className="mb-6 font-bold">New Application</p>
          <div className="grid relative grid-cols-2 gap-x-6 min-h-0">
            <div className="overflow-y-scroll space-y-3 hide-scrollbar">
              <div>
                <label
                  className="block mb-1 text-sm"
                  htmlFor={INPUT_ID.APP_NAME}
                >
                  Name
                </label>
                <Input
                  id={INPUT_ID.APP_NAME}
                  placeholder="ie: TheCodeIsAlreadyDeployed"
                  value={applicationName}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm"
                  htmlFor={INPUT_ID.REPO_URL}
                >
                  Repository Url
                </label>
                <Input
                  id={INPUT_ID.REPO_URL}
                  placeholder="ie: https://github.com/thecodeisalreadydeployed/frontend"
                  value={applicationRepoUrl}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm" htmlFor={INPUT_ID.BRANCH}>
                  Branch
                </label>
                <Input
                  id={INPUT_ID.BRANCH}
                  placeholder="ie: master"
                  value={applicationBranch}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm"
                  htmlFor={INPUT_ID.BUILD_SCRIPT}
                >
                  Build Script
                </label>
                <Select
                  selectOptions={selectOptions}
                  value={applicationBuildScript}
                  onChangeSelection={(newValue) =>
                    setApplicationBuildScript(newValue)
                  }
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm"
                  htmlFor={INPUT_ID.OUTPUT_DIR}
                >
                  Output Directory
                </label>
                <Input
                  id={INPUT_ID.OUTPUT_DIR}
                  placeholder="ie: ....."
                  value={applicationOutputDirectory}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm"
                  htmlFor={INPUT_ID.INSTALL_CMD}
                >
                  Install Command
                </label>
                <Input
                  id={INPUT_ID.INSTALL_CMD}
                  placeholder="ie: ....."
                  value={applicationInstallCommand}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm"
                  htmlFor={INPUT_ID.BUILD_CMD}
                >
                  Build Command
                </label>
                <Input
                  id={INPUT_ID.BUILD_CMD}
                  placeholder="ie: ....."
                  value={applicationBuildCommand}
                  onChange={handleOnInputChange}
                />
              </div>
              <div ref={inputContainerRef}>
                <label
                  className="block mb-1 text-sm"
                  htmlFor={INPUT_ID.START_COMMAND}
                >
                  Start Command
                </label>
                <Input
                  id={INPUT_ID.START_COMMAND}
                  placeholder="ie: ....."
                  value={applicationStartCommand}
                  onChange={handleOnInputChange}
                />
              </div>
            </div>
            <Code
              code={customScript}
              language="docker"
              onChangeCode={(value) => setCustomScript(value)}
            />
            {!isInputContainerScrolledToBottom && (
              <div className="absolute -bottom-8 left-0 animate-bounce">
                <ChevronDownIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-x-6 justify-end py-4 px-6">
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
