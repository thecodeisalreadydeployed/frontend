export interface Actor {
  email: string;
  gitProvider: string;
}

export interface App {
  id: string;
  projectID: string;
  name: string;
  gitSource: GitSource;
  createdAt: string;
  updatedAt: string;
  buildConfiguration: BuildConfiguration;
  observable: boolean;
}

export interface BuildConfiguration {
  buildScript: string;
  workingDirectory: string;
  installCommand: string;
  buildCommand: string;
  outputDirectory: string;
  startCommand: string;
}

export enum DeploymentState {
  DeploymentStateQueueing = "DeploymentStateQueueing",
  DeploymentStateBuilding = "DeploymentStateBuilding",
  DeploymentStateBuildSucceede = "DeploymentStateBuildSucceeded",
  DeploymentStateCommitted = "DeploymentStateCommitted",
  DeploymentStateReady = "DeploymentStateReady",
  DeploymentStateError = "DeploymentStateError",
}

export interface Deployment {
  id: string;
  appID: string;
  creator: Actor;
  meta: string;
  gitSource: GitSource;
  builtAt: string;
  committedAt: string;
  deployedAt: string;
  buildConfiguration: BuildConfiguration;
  createdAt: string;
  updatedAt: string;
  state: DeploymentState;
}

export enum EventType {
  INFO = "INFO",
  DEBUG = "DEBUG",
  ERROR = "ERROR",
}

export interface Event {
  id: string;
  deploymentID: string;
  text: string;
  type: EventType;
  createdAt: string;
  exportedAt: string;
}

export interface GitSource {
  commitSHA: string;
  commitMessage: string;
  commitAuthorName: string;
  repositoryURL: string;
  branch: string;
}

export interface Preset {
  id: string;
  name: string;
  template: string;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
