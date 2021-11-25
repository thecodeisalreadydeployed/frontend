export interface Application {
  id: string;
  projectID: string;
  name: string;
  gitSource: GitSource;
  createdAt: Date;
  updatedAt: Date;
  buildConfiguration: BuildConfiguration;
  observable: boolean;
}

export interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deployment {
  id: string;
  appID: string;
  creator: Creator;
  meta: string;
  gitSource: GitSource;
  builtAt: Date;
  committedAt: Date;
  deployedAt: Date;
  buildConfiguration: BuildConfiguration;
  createdAt: Date;
  updatedAt: Date;
  state: string;
}

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

export interface Creator {
  email: string;
  gitProvider: string;
}
