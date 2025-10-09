// API Request/Response типы для CustomModels

export interface CustomModelAttributeApiData {
  [key: string]: (string | number)[];
}

// States хранятся в ModelVariants, а не в CustomModel
export interface CustomModelStateApiData {
  type: number;
  image: string | null;
  price: number;
}

export interface CustomModelApiRequest {
  id?: string;
  name: string;
  attributes: CustomModelAttributeApiData[];
  states: CustomModelStateApiData[];
  project_id: string;
  is_published: boolean;
}

export interface CustomModelApiResponse {
  id: string;
  name: string;
  attributes: CustomModelAttributeApiData[];
  states: CustomModelStateApiData[];
  project_id: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCustomModelApiRequest {
  name: string;
  attributes: CustomModelAttributeApiData[];
  states: CustomModelStateApiData[];
  project_id: string;
  is_published?: boolean;
}

export interface UpdateCustomModelApiRequest {
  id: string;
  name: string;
  attributes: CustomModelAttributeApiData[];
  states: CustomModelStateApiData[];
  project_id: string;
  is_published: boolean;
}

export interface LoadCustomModelsApiResponse {
  project_id: string;
}
