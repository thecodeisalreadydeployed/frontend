import { useCallback, useEffect, useMemo, useState } from "react";

import {
  CubeTransparentIcon,
  DocumentTextIcon,
  FolderIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon, XIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useScrollToBottom } from "hooks";
import {
  useCreateNewApplication,
  useGetGitBranches,
  useGetGitFiles,
  useGetGitRaw,
} from "services";
import useSWR from "swr";
import { arrayPathToObjectTree, parseBuildScript } from "utils";

import { Button, Code, Input, Modal, Select, SelectOption } from "@atoms";
import type { Preset } from "types/schema";

interface CreateApplicationModalProps {
  onClose?: () => void;
  showModal: boolean;
  projectId: string;
}

enum BUTTON_CREATE_APP_ID {
  CONFIRM = "create-application-modal-next-button",
  CANCEL = "create-application-modal-cancel-button",
}
enum BUTTON_SELECT_FILE_ID {
  CONFIRM = "select-file-modal-confirm-button",
  CANCEL = "select-file-modal-cancel-button",
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

  const { createNewApplication } = useCreateNewApplication();
  const [filePath, setFilePath] = useState<Array<string>>([]);
  const [selectedFileName, setSelectedFileName] = useState<string>();

  const [isFileTreeModalOpen, setIsFileTreeModalOpen] = useState(false);

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
  const [applicationBranch, setApplicationBranch] =
    useState<SelectOption<string>>();
  const [customCode, setCustomCode] = useState("");

  const { getGitBranches, gitBranches } = useGetGitBranches();

  const { getGitFiles, gitFiles } = useGetGitFiles();
  const { getGitRaw, gitRaw } = useGetGitRaw();

  const filesObjectTree = useMemo(
    () => (gitFiles ? arrayPathToObjectTree(gitFiles) : []),
    [gitFiles]
  );

  const currentObjectTree = useCallback(() => {
    let temp = [...filesObjectTree];
    for (let index = 0; index < filePath.length; index++) {
      const label = filePath[index];
      const currentFiles = temp.find((file) => file.label === label);
      if (!currentFiles?.items) break;
      temp = currentFiles.items;
    }

    const folders: typeof temp = [];
    const files: typeof temp = [];

    temp.forEach((item) => {
      item.items ? folders.push(item) : files.push(item);
    });

    return [
      ...folders.sort((a, b) => a.label.localeCompare(b.label)),
      ...files.sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [filePath, filesObjectTree]);

  const buildScriptSelectOptions = useMemo(
    () =>
      presetsData?.map((data) => ({
        id: data.id,
        name: data.name,
        value: data.template,
      })),
    [presetsData]
  );

  const branchSelectOptions = useMemo(
    () =>
      gitBranches?.map((data, index) => ({
        id: index.toString(),
        name: data,
        value: data,
      })),
    [gitBranches]
  );

  const [lockInput, setLockInput] = useState(false);

  const [inputContainerRef, isInputContainerScrolledToBottom] =
    useScrollToBottom();

  const resetInput = () => {
    setApplicationName("");
    setApplicationRepoUrl("");
    setApplicationBuildScript(undefined);
    setApplicationBranch(undefined);
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
        setApplicationBranch(undefined);
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
    }
  };

  const handleOnClickButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = e.currentTarget.id;
    switch (id) {
      case BUTTON_CREATE_APP_ID.CANCEL:
        closeModal();
        resetInput();
        setLockInput(false);
        setCustomCode("");
        break;
      case BUTTON_CREATE_APP_ID.CONFIRM:
        if (!applicationBranch?.value) return;
        createNewApplication({
          branch: applicationBranch?.value,
          buildScript: customCode,
          name: applicationName,
          projectId: projectId,
          repositoryURL: applicationRepoUrl,
        });
        closeModal();
        resetInput();
        break;
      case BUTTON_SELECT_FILE_ID.CANCEL:
        setIsFileTreeModalOpen(false);
        setSelectedFileName(undefined);
        setFilePath([]);
        break;
      case BUTTON_SELECT_FILE_ID.CONFIRM:
        if (!selectedFileName) return;
        setIsFileTreeModalOpen(false);
        if (applicationBranch) {
          getGitRaw(
            applicationBranch.value,
            filePath.join("/") + "/" + selectedFileName,
            applicationRepoUrl
          );
        }

        break;
    }
  };

  useEffect(() => {
    if (gitRaw) {
      setCustomCode(gitRaw);
      setLockInput(true);
    }
  }, [gitRaw]);

  const parsedBuildScript = parseBuildScript(applicationBuildScript?.value, {
    buildCommand: applicationBuildCommand,
    installCommand: applicationInstallCommand,
    outputDirectory: applicationOutputDirectory,
    startCommand: applicationStartCommand,
  });

  useEffect(() => {
    setCustomCode(parsedBuildScript);
  }, [parsedBuildScript]);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        closeModal();
        resetInput();
        setLockInput(false);
        setCustomCode("");
      }}
    >
      <div className="flex h-screen max-h-[30rem] w-screen max-w-[56rem] flex-col overflow-hidden text-base font-normal text-zinc-200">
        <div className="flex min-h-0 flex-col p-6">
          <p className="mb-6 font-bold">New Application</p>
          <div
            className={clsx(
              "relative grid min-h-0 gap-x-6",
              lockInput ? "grid-cols-3" : "grid-cols-2"
            )}
          >
            <div className="hide-scrollbar space-y-3 overflow-y-scroll">
              <div>
                <label
                  className="mb-1 block text-sm"
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
                  className="mb-1 block text-sm"
                  htmlFor={INPUT_ID.REPO_URL}
                >
                  Repository URL
                </label>
                <Input
                  id={INPUT_ID.REPO_URL}
                  placeholder="ie: https://github.com/thecodeisalreadydeployed/frontend"
                  value={applicationRepoUrl}
                  onBlur={() => getGitBranches(applicationRepoUrl)}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm" htmlFor={INPUT_ID.BRANCH}>
                  Branch
                </label>
                <Select
                  disabled={applicationRepoUrl.length === 0}
                  selectOptions={branchSelectOptions}
                  value={applicationBranch}
                  onChangeSelection={(newValue) =>
                    setApplicationBranch(newValue)
                  }
                />
              </div>
              <div>
                <Button
                  disabled={applicationBranch?.value === undefined}
                  fullWidth
                  onClick={() => {
                    setIsFileTreeModalOpen(true);
                    applicationBranch?.value &&
                      getGitFiles(applicationBranch.value, applicationRepoUrl);
                  }}
                >
                  Select from file
                </Button>
                <Modal
                  isOpen={isFileTreeModalOpen}
                  onClose={() => setIsFileTreeModalOpen(false)}
                >
                  <div className="m-6 flex h-screen max-h-[30rem] w-screen max-w-[56rem] flex-col">
                    <p className="mb-4 text-xl">
                      {filePath.length ? filePath.join("/") : "Root"}
                    </p>
                    <div className="overflow-y-scroll">
                      {filePath.length > 0 && (
                        <div
                          className={clsx(
                            "flex cursor-pointer items-center space-x-2 rounded-xl p-2 hover:bg-zinc-800"
                          )}
                          onClick={() => {
                            setSelectedFileName(undefined);
                            setFilePath((prev) => {
                              const temp = [...prev];
                              temp.pop();
                              return temp;
                            });
                          }}
                        >
                          <p>../</p>
                        </div>
                      )}
                      {currentObjectTree()?.map((file) => {
                        const isFile = !file.items;
                        return (
                          <div
                            key={file.label}
                            className={clsx(
                              "flex cursor-pointer items-center space-x-2 rounded-xl p-2",
                              file.label === selectedFileName
                                ? "bg-zinc-500"
                                : "hover:bg-zinc-800"
                            )}
                            onClick={() => {
                              setSelectedFileName(undefined);
                              if (isFile) {
                                setSelectedFileName(file.label);
                              } else {
                                setFilePath((prev) => [...prev, file.label]);
                              }
                            }}
                          >
                            {isFile ? (
                              file.label.toLowerCase().match(/dockerfile/) ? (
                                <CubeTransparentIcon className="h-4 w-4 text-orange-400" />
                              ) : (
                                <DocumentTextIcon className="h-4 w-4" />
                              )
                            ) : (
                              <FolderIcon className="h-4 w-4" />
                            )}
                            <p>{file.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-end gap-x-6 py-4 px-6">
                    <Button
                      fullWidth
                      id={BUTTON_SELECT_FILE_ID.CANCEL}
                      type="outline"
                      onClick={handleOnClickButton}
                    >
                      Cancel
                    </Button>
                    <Button
                      fullWidth
                      id={BUTTON_SELECT_FILE_ID.CONFIRM}
                      onClick={handleOnClickButton}
                    >
                      Confirm
                    </Button>
                  </div>
                </Modal>
              </div>
              <div>
                <label
                  className="mb-1 block text-sm"
                  htmlFor={INPUT_ID.BUILD_SCRIPT}
                >
                  Build Script
                </label>
                <Select
                  disabled={lockInput}
                  selectOptions={buildScriptSelectOptions}
                  value={applicationBuildScript}
                  onChangeSelection={(newValue) =>
                    setApplicationBuildScript(newValue)
                  }
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm"
                  htmlFor={INPUT_ID.OUTPUT_DIR}
                >
                  Output Directory
                </label>
                <Input
                  disabled={lockInput}
                  id={INPUT_ID.OUTPUT_DIR}
                  placeholder="ie: ....."
                  value={applicationOutputDirectory}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm"
                  htmlFor={INPUT_ID.INSTALL_CMD}
                >
                  Install Command
                </label>
                <Input
                  disabled={lockInput}
                  id={INPUT_ID.INSTALL_CMD}
                  placeholder="ie: ....."
                  value={applicationInstallCommand}
                  onChange={handleOnInputChange}
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm"
                  htmlFor={INPUT_ID.BUILD_CMD}
                >
                  Build Command
                </label>
                <Input
                  disabled={lockInput}
                  id={INPUT_ID.BUILD_CMD}
                  placeholder="ie: ....."
                  value={applicationBuildCommand}
                  onChange={handleOnInputChange}
                />
              </div>
              <div ref={inputContainerRef}>
                <label
                  className="mb-1 block text-sm"
                  htmlFor={INPUT_ID.START_COMMAND}
                >
                  Start Command
                </label>
                <Input
                  disabled={lockInput}
                  id={INPUT_ID.START_COMMAND}
                  placeholder="ie: ....."
                  value={applicationStartCommand}
                  onChange={handleOnInputChange}
                />
              </div>
            </div>
            <div
              className={clsx(
                "relative grid overflow-y-scroll rounded-lg bg-zinc-700/50 hover:bg-zinc-600/50",
                lockInput && "col-span-2"
              )}
            >
              {lockInput && (
                <div
                  className="absolute top-2 right-2 flex cursor-pointer items-center justify-center"
                  onClick={() => {
                    setCustomCode(parsedBuildScript);
                    setLockInput(false);
                  }}
                >
                  <XIcon className="m-1 h-4 w-4 text-zinc-200/50 hover:text-zinc-100/50" />
                </div>
              )}
              <Code
                code={customCode}
                editable
                language="docker"
                onChangeCode={(value) => setCustomCode(value)}
                onClick={() => setLockInput(true)}
              />
            </div>
            {!isInputContainerScrolledToBottom && (
              <div className="absolute -bottom-8 left-0 animate-bounce">
                <ChevronDownIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-x-6 py-4 px-6">
          <Button
            fullWidth
            id={BUTTON_CREATE_APP_ID.CANCEL}
            type="outline"
            onClick={handleOnClickButton}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            id={BUTTON_CREATE_APP_ID.CONFIRM}
            onClick={handleOnClickButton}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};
