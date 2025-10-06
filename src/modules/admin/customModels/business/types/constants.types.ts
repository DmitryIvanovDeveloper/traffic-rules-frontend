// Константы для типизации CustomModels

// Валидационные константы
export const VALIDATION_CONSTANTS = {
  NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z0-9\s\-_]+$/,
  },
  ATTRIBUTE_KEY: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  ATTRIBUTE_VALUES: {
    MIN_COUNT: 1,
    MAX_COUNT: 100,
  },
  ATTRIBUTES: {
    MIN_COUNT: 1,
    MAX_COUNT: 20,
  },
  UUID_PATTERN: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;

// Коды ошибок
export const ERROR_CODES = {
  VALIDATION: {
    REQUIRED: 'REQUIRED',
    MIN_LENGTH: 'MIN_LENGTH',
    MAX_LENGTH: 'MAX_LENGTH',
    MIN_COUNT: 'MIN_COUNT',
    MAX_COUNT: 'MAX_COUNT',
    INVALID_PATTERN: 'INVALID_PATTERN',
    INVALID_FORMAT: 'INVALID_FORMAT',
    INVALID_TYPE: 'INVALID_TYPE',
  },
  API: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    DUPLICATE_NAME: 'DUPLICATE_NAME',
    INVALID_PROJECT_ID: 'INVALID_PROJECT_ID',
  },
} as const;

// HTTP статус коды
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Типы для констант
export type ValidationConstants = typeof VALIDATION_CONSTANTS;
export type ErrorCodes = typeof ERROR_CODES;
export type HttpStatus = typeof HTTP_STATUS;

// Типы для значений констант
export type ErrorCode = 
  | typeof ERROR_CODES.VALIDATION[keyof typeof ERROR_CODES.VALIDATION]
  | typeof ERROR_CODES.API[keyof typeof ERROR_CODES.API];

export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

// Функции для работы с константами
export function isValidErrorCode(code: string): code is ErrorCode {
  return Object.values(ERROR_CODES.VALIDATION).includes(code as any) ||
         Object.values(ERROR_CODES.API).includes(code as any);
}

export function isValidHttpStatus(status: number): status is HttpStatusCode {
  return Object.values(HTTP_STATUS).includes(status as any);
}

// Типы для валидации с использованием констант
export interface ValidationRule<T> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minCount?: number;
  maxCount?: number;
  pattern?: RegExp;
  type?: T;
}

export interface CustomModelValidationRules {
  name: ValidationRule<string>;
  attributes: ValidationRule<Array<{ key: string; values: (string | number)[] }>>;
  projectId: ValidationRule<string>;
}

export const CUSTOM_MODEL_VALIDATION_RULES: CustomModelValidationRules = {
  name: {
    required: true,
    minLength: VALIDATION_CONSTANTS.NAME.MIN_LENGTH,
    maxLength: VALIDATION_CONSTANTS.NAME.MAX_LENGTH,
    pattern: VALIDATION_CONSTANTS.NAME.PATTERN,
    type: 'string' as any,
  },
  attributes: {
    required: true,
    minCount: VALIDATION_CONSTANTS.ATTRIBUTES.MIN_COUNT,
    maxCount: VALIDATION_CONSTANTS.ATTRIBUTES.MAX_COUNT,
    type: 'array' as any,
  },
  projectId: {
    required: true,
    pattern: VALIDATION_CONSTANTS.UUID_PATTERN,
    type: 'string' as any,
  },
} as const;








