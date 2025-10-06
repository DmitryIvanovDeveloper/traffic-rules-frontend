// API Request/Response типы для ModelVariants

export interface ModelVariantAttributeApiData {
  [key: string]: string | number;
}

export interface ModelVariantStateApiData {
  type: number;
  image: string | null;
  price: number;
}

export interface ModelVariantApiRequest {
  id?: string;
  custom_model: string;
  name: string;
  attributes: ModelVariantAttributeApiData[];
  states: ModelVariantStateApiData[];
  is_published: boolean;
}

export interface ModelVariantApiResponse {
  id: string;
  custom_model: string;
  name: string;
  attributes: ModelVariantAttributeApiData[];
  states: ModelVariantStateApiData[];
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateModelVariantApiRequest {
  custom_model: string;
  name: string;
  attributes: ModelVariantAttributeApiData[];
  states: ModelVariantStateApiData[];
  is_published?: boolean;
}

export interface LoadModelVariantsApiRequest {
  model_id: string;
}

export interface UpdateModelVariantApiRequest {
  id?: string;
  custom_model: string;
  name: string;
  attributes: ModelVariantAttributeApiData[];
  states: ModelVariantStateApiData[];
  is_published: boolean;
}
