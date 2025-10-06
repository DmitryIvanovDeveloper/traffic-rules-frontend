// API Request/Response типы для DamageTypes

export interface DamageTypeApiData {
  id?: string;
  lang_iso: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateDamageTypesApiRequest extends Array<{
  lang_iso: string;
  name: string;
}> {}

export interface DamageTypeApiResponse extends DamageTypeApiData {
  id: string;
}



