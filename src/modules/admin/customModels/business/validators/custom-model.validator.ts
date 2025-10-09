import { 
  ValidationResult, 
  ValidationError, 
  CustomModelValidationRules,
  CustomModelAttributeValidationRules 
} from '../types/validation.types';
import { CreateCustomModelInput, UpdateCustomModelInput } from '../usecases/types';

export class CustomModelValidator {
  private static readonly validationRules: CustomModelValidationRules = {
    name: {
      required: true,
      minLength: 1,
      maxLength: 100
    },
    attributes: {
      required: true,
      minCount: 1,
      maxCount: 20
    },
    projectId: {
      required: true,
      format: 'uuid'
    }
  };

  private static readonly attributeValidationRules: CustomModelAttributeValidationRules = {
    key: {
      required: true,
      minLength: 1,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9_]+$/
    },
    values: {
      required: true,
      minCount: 1,
      maxCount: 100,
      itemType: 'string'
    }
  };

  public static validateCreateInput(input: CreateCustomModelInput): ValidationResult {
    const errors: ValidationError[] = [];

    // Валидация имени
    if (!input.name || input.name.trim() === '') {
      errors.push({
        field: 'name',
        message: 'Имя модели обязательно',
        code: 'REQUIRED'
      });
    } else if (input.name.length < this.validationRules.name.minLength) {
      errors.push({
        field: 'name',
        message: `Имя должно содержать минимум ${this.validationRules.name.minLength} символов`,
        code: 'MIN_LENGTH'
      });
    } else if (input.name.length > this.validationRules.name.maxLength) {
      errors.push({
        field: 'name',
        message: `Имя должно содержать максимум ${this.validationRules.name.maxLength} символов`,
        code: 'MAX_LENGTH'
      });
    }

    // Валидация атрибутов
    if (!input.attributes || input.attributes.length === 0) {
      errors.push({
        field: 'attributes',
        message: 'Атрибуты обязательны',
        code: 'REQUIRED'
      });
    } else {
      if (input.attributes.length < this.validationRules.attributes.minCount) {
        errors.push({
          field: 'attributes',
          message: `Должен быть минимум ${this.validationRules.attributes.minCount} атрибут`,
          code: 'MIN_COUNT'
        });
      }
      if (input.attributes.length > this.validationRules.attributes.maxCount) {
        errors.push({
          field: 'attributes',
          message: `Максимум ${this.validationRules.attributes.maxCount} атрибутов`,
          code: 'MAX_COUNT'
        });
      }

      // Валидация каждого атрибута
      input.attributes.forEach((attr, index) => {
        const attributeErrors = this.validateAttribute(attr, index);
        errors.push(...attributeErrors);
      });
    }

    // Валидация projectId
    if (!input.projectId) {
      errors.push({
        field: 'projectId',
        message: 'ID проекта обязателен',
        code: 'REQUIRED'
      });
    } else if (!this.isValidUUID(input.projectId)) {
      errors.push({
        field: 'projectId',
        message: 'ID проекта должен быть валидным UUID',
        code: 'INVALID_FORMAT'
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public static validateUpdateInput(input: UpdateCustomModelInput): ValidationResult {
    const errors: ValidationError[] = [];

    // Валидация ID
    if (!input.id) {
      errors.push({
        field: 'id',
        message: 'ID модели обязателен',
        code: 'REQUIRED'
      });
    } else if (!this.isValidUUID(input.id)) {
      errors.push({
        field: 'id',
        message: 'ID модели должен быть валидным UUID',
        code: 'INVALID_FORMAT'
      });
    }

    // Валидация имени
    if (!input.name || input.name.trim() === '') {
      errors.push({
        field: 'name',
        message: 'Имя модели обязательно',
        code: 'REQUIRED'
      });
    } else if (input.name.length < this.validationRules.name.minLength) {
      errors.push({
        field: 'name',
        message: `Имя должно содержать минимум ${this.validationRules.name.minLength} символов`,
        code: 'MIN_LENGTH'
      });
    } else if (input.name.length > this.validationRules.name.maxLength) {
      errors.push({
        field: 'name',
        message: `Имя должно содержать максимум ${this.validationRules.name.maxLength} символов`,
        code: 'MAX_LENGTH'
      });
    }

    // Валидация projectId
    if (!input.projectId) {
      errors.push({
        field: 'projectId',
        message: 'ID проекта обязателен',
        code: 'REQUIRED'
      });
    } else if (!this.isValidUUID(input.projectId)) {
      errors.push({
        field: 'projectId',
        message: 'ID проекта должен быть валидным UUID',
        code: 'INVALID_FORMAT'
      });
    }

    // Валидация атрибутов
    if (!input.attributes || input.attributes.length === 0) {
      errors.push({
        field: 'attributes',
        message: 'Атрибуты обязательны',
        code: 'REQUIRED'
      });
    } else {
      if (input.attributes.length < this.validationRules.attributes.minCount) {
        errors.push({
          field: 'attributes',
          message: `Должен быть минимум ${this.validationRules.attributes.minCount} атрибут`,
          code: 'MIN_COUNT'
        });
      }
      
      if (input.attributes.length > this.validationRules.attributes.maxCount) {
        errors.push({
          field: 'attributes',
          message: `Максимум ${this.validationRules.attributes.maxCount} атрибутов`,
          code: 'MAX_COUNT'
        });
      }

      // Валидация каждого атрибута
      input.attributes.forEach((attr, index) => {
        const attributeErrors = this.validateAttribute(attr, index);
        errors.push(...attributeErrors);
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static validateAttribute(attr: { key: string; values: (string | number)[] }, index: number): ValidationError[] {
    const errors: ValidationError[] = [];

    // Валидация ключа атрибута
    if (!attr.key || attr.key.trim() === '') {
      errors.push({
        field: `attributes[${index}].key`,
        message: 'Ключ атрибута обязателен',
        code: 'REQUIRED'
      });
    } else if (attr.key.length < this.attributeValidationRules.key.minLength) {
      errors.push({
        field: `attributes[${index}].key`,
        message: `Ключ должен содержать минимум ${this.attributeValidationRules.key.minLength} символ`,
        code: 'MIN_LENGTH'
      });
    } else if (attr.key.length > this.attributeValidationRules.key.maxLength) {
      errors.push({
        field: `attributes[${index}].key`,
        message: `Ключ должен содержать максимум ${this.attributeValidationRules.key.maxLength} символов`,
        code: 'MAX_LENGTH'
      });
    } else if (!this.attributeValidationRules.key.pattern.test(attr.key)) {
      errors.push({
        field: `attributes[${index}].key`,
        message: 'Ключ может содержать только буквы, цифры и подчеркивания',
        code: 'INVALID_PATTERN'
      });
    }

    // Валидация значений атрибута
    if (!attr.values || attr.values.length === 0) {
      errors.push({
        field: `attributes[${index}].values`,
        message: 'Значения атрибута обязательны',
        code: 'REQUIRED'
      });
    } else {
      if (attr.values.length < this.attributeValidationRules.values.minCount) {
        errors.push({
          field: `attributes[${index}].values`,
          message: `Должно быть минимум ${this.attributeValidationRules.values.minCount} значение`,
          code: 'MIN_COUNT'
        });
      }
      if (attr.values.length > this.attributeValidationRules.values.maxCount) {
        errors.push({
          field: `attributes[${index}].values`,
          message: `Максимум ${this.attributeValidationRules.values.maxCount} значений`,
          code: 'MAX_COUNT'
        });
      }

      // Валидация типов значений
      attr.values.forEach((value, valueIndex) => {
        if (typeof value !== this.attributeValidationRules.values.itemType && typeof value !== 'number') {
          errors.push({
            field: `attributes[${index}].values[${valueIndex}]`,
            message: `Значение должно быть строкой или числом`,
            code: 'INVALID_TYPE'
          });
        }
      });
    }

    return errors;
  }

  private static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}





