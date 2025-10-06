// Runtime типы для защиты от ошибок времени выполнения
import Result from "@/infrastructure/helpers/result";

// Безопасные типы для API ответов
export type SafeApiResponse<T> = {
  data?: T;
  errors?: string[];
  status?: number;
};

// Безопасные типы для валидации
export type SafeValidationResult = {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;
};

// Типы для обработки ошибок
export type CustomModelErrorType = 
  | 'VALIDATION_ERROR'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'NOT_FOUND'
  | 'DUPLICATE_NAME'
  | 'INVALID_PROJECT_ID'
  | 'UNKNOWN_ERROR';

export interface CustomModelError {
  type: CustomModelErrorType;
  message: string;
  field?: string;
  code?: string;
  details?: any;
}

// Типы для безопасного парсинга
export type SafeCustomModelData = {
  id: string;
  name: string;
  attributes: Array<{
    key: string;
    values: (string | number)[];
  }>;
  project_id: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
};

// Функции-гарды для проверки типов
export function isCustomModelData(data: unknown): data is SafeCustomModelData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as any).id === 'string' &&
    typeof (data as any).name === 'string' &&
    Array.isArray((data as any).attributes) &&
    typeof (data as any).project_id === 'string' &&
    typeof (data as any).is_published === 'boolean'
  );
}

export function isCustomModelAttributeData(data: unknown): data is { key: string; values: (string | number)[] } {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as any).key === 'string' &&
    Array.isArray((data as any).values)
  );
}

// Безопасные функции парсинга
export function safeParseCustomModel(data: unknown): Result<SafeCustomModelData> {
  if (!isCustomModelData(data)) {
    return Result.failure(new Error('Invalid custom model data structure'));
  }
  return Result.success(data);
}

export function safeParseCustomModelArray(data: unknown): Result<SafeCustomModelData[]> {
  if (!Array.isArray(data)) {
    return Result.failure(new Error('Expected array of custom models'));
  }
  
  const results: SafeCustomModelData[] = [];
  for (const item of data) {
    if (isCustomModelData(item)) {
      results.push(item);
    } else {
      return Result.failure(new Error('Invalid custom model in array'));
    }
  }
  
  return Result.success(results);
}
