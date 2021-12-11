/* Do not change, this code is generated from Golang structs */

export interface BuildConfiguration {
  buildScript: string;
  parseBuildScript: boolean;
  workingDirectory: string;
  installCommand: string;
  buildCommand: string;
  outputDirectory: string;
  startCommand: string;
}
export interface GitSource {
  commitSHA: string;
  commitMessage: string;
  commitAuthorName: string;
  repositoryURL: string;
  branch: string;
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
export interface Actor {
  email: string;
  gitProvider: string;
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
  state: string;
}
export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
