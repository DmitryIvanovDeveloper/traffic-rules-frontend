// Типы для валидации ModelVariants

export interface ModelVariantValidationRules {
  name: {
    required: true;
    minLength: 1;
    maxLength: 100;
    pattern?: RegExp;
  };
  customModelId: {
    required: true;
    format: 'uuid';
  };
  attributes: {
    required: true;
    minCount: 1;
    maxCount: 20;
  };
  states: {
    required: true;
    minCount: 1;
    maxCount: 10;
  };
}

export interface ModelVariantAttributeValidationRules {
  key: {
    required: true;
    minLength: 1;
    maxLength: 50;
    pattern: RegExp;
  };
  value: {
    required: true;
    type: 'string' | 'number';
  };
}

export interface ModelVariantStateValidationRules {
  type: {
    required: true;
    type: 'number';
    min: 0;
    max: 999;
  };
  image: {
    required: false;
    type: 'string' | 'null';
    maxLength?: number;
  };
  price: {
    required: true;
    type: 'number';
    min: 0;
    max: 999999.99;
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
export type ModelVariantInputValidator = (input: unknown) => ValidationResult;
export type ModelVariantAttributeValidator = (input: unknown) => ValidationResult;
export type ModelVariantStateValidator = (input: unknown) => ValidationResult;








