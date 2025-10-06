// Типы для валидации DamageTypes

export interface DamageTypeValidationRules {
  langIso: {
    required: true;
    pattern: RegExp; // ISO 639-1 format (2 letters)
    length: 2;
  };
  name: {
    required: true;
    minLength: 1;
    maxLength: 100;
  };
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Типы для runtime валидации
export type DamageTypeInputValidator = (input: unknown) => ValidationResult;
export type DamageTypeBatchValidator = (input: unknown[]) => ValidationResult;








