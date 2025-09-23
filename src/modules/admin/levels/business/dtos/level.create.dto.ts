export interface ILevelCreateRequestDTO {
  level: string;
  lang: string;
  projectId: string;
}

export interface ILevelCreateResponseDTO {
  id: string;
  level: string;
  lang: string;
  projectId: string;
}
