// Типы для валидации CustomModels

export interface CustomModelValidationRules {
  name: {
    required: true;
    minLength: 1;
    maxLength: 100;
    pattern?: RegExp;
  };
  attributes: {
    required: true;
    minCount: 1;
    maxCount: 20;
  };
  projectId: {
    required: true;
    format: 'uuid';
  };
}

export interface CustomModelAttributeValidationRules {
  key: {
    required: true;
    minLength: 1;
    maxLength: 50;
    pattern: RegExp; // Например, только буквы, цифры и подчеркивания
  };
  values: {
    required: true;
    minCount: 1;
    maxCount: 100;
    itemType: 'string' | 'number';
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
export type CustomModelInputValidator = (input: unknown) => ValidationResult;
export type CustomModelAttributeValidator = (input: unknown) => ValidationResult;










