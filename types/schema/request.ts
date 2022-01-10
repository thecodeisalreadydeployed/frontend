import type { EventType } from "./model";

export interface CreateAppRequest {
  ProjectID: string;
  Name: string;
  RepositoryURL: string;
  BuildScript: string;
  InstallCommand: string;
  BuildCommand: string;
  OutputDirectory: string;
  StartCommand: string;
  Branch: string;
}

export interface ValidateBuildScriptRequest {
  buildScript: string;
}

export interface CreateDeploymentEventRequest {
  Text: string;
  ExportedAt: string;
  Type: EventType;
}

export interface CreatePresetRequest {
  Name: string;
  Template: string;
}

export interface CreateProjectRequest {
  Name: string;
}
