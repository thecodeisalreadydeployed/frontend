import type { EventType } from "./model";

export interface CreateAppRequest {
  projectID: string;
  name: string;
  repositoryURL: string;
  buildScript: string;
  branch: string;
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
