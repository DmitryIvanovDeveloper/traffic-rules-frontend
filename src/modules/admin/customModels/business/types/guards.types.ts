// Type Guards для защиты типизации

import { SafeCustomModelData } from './runtime.types';

// Базовые type guards
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return isObject(value) && value !== null;
}

// UUID validation
export function isUUID(value: unknown): value is string {
  if (!isString(value)) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

// Email validation
export function isEmail(value: unknown): value is string {
  if (!isString(value)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

// Date string validation (ISO format)
export function isISODateString(value: unknown): value is string {
  if (!isString(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime()) && value === date.toISOString();
}

// Custom Model specific type guards
export function isCustomModelAttribute(value: unknown): value is { key: string; values: (string | number)[] } {
  if (!isObject(value)) return false;
  
  const { key, values } = value;
  return isString(key) && isArray(values) && values.every(v => isString(v) || isNumber(v));
}

export function isCustomModelApiData(value: unknown): value is SafeCustomModelData {
  if (!isObject(value)) return false;
  
  const { id, name, attributes, project_id, is_published, created_at, updated_at } = value;
  
  return (
    isUUID(id) &&
    isString(name) &&
    isArray(attributes) &&
    attributes.every(isCustomModelAttribute) &&
    isUUID(project_id) &&
    isBoolean(is_published) &&
    (created_at === undefined || isISODateString(created_at)) &&
    (updated_at === undefined || isISODateString(updated_at))
  );
}

// Model Variant specific type guards
export function isModelVariantAttribute(value: unknown): value is { key: string; value: string | number } {
  if (!isObject(value)) return false;
  
  const { key, value } = value;
  return isString(key) && (isString(value) || isNumber(value));
}

export function isModelVariantState(value: unknown): value is { type: number; image: string | null; price: number } {
  if (!isObject(value)) return false;
  
  const { type, image, price } = value;
  return isNumber(type) && (isString(image) || image === null) && isNumber(price);
}

// Damage Type specific type guards
export function isDamageTypeApiData(value: unknown): value is { id: string; lang_iso: string; name: string; created_at?: string; updated_at?: string } {
  if (!isObject(value)) return false;
  
  const { id, lang_iso, name, created_at, updated_at } = value;
  
  return (
    isUUID(id) &&
    isString(lang_iso) &&
    isString(name) &&
    (created_at === undefined || isISODateString(created_at)) &&
    (updated_at === undefined || isISODateString(updated_at))
  );
}

// API Response type guards
export function isApiSuccessResponse<T>(value: unknown): value is { data: T; status: number } {
  if (!isObject(value)) return false;
  
  const { data, status } = value;
  return data !== undefined && isNumber(status) && status >= 200 && status < 300;
}

export function isApiErrorResponse(value: unknown): value is { errors: string[]; status: number } {
  if (!isObject(value)) return false;
  
  const { errors, status } = value;
  return isArray(errors) && errors.every(isString) && isNumber(status) && status >= 400;
}

// Utility functions
export function assertIsString(value: unknown, fieldName: string): asserts value is string {
  if (!isString(value)) {
    throw new Error(`${fieldName} must be a string`);
  }
}

export function assertIsNumber(value: unknown, fieldName: string): asserts value is number {
  if (!isNumber(value)) {
    throw new Error(`${fieldName} must be a number`);
  }
}

export function assertIsUUID(value: unknown, fieldName: string): asserts value is string {
  if (!isUUID(value)) {
    throw new Error(`${fieldName} must be a valid UUID`);
  }
}

export function assertIsArray<T>(value: unknown, fieldName: string): asserts value is T[] {
  if (!isArray(value)) {
    throw new Error(`${fieldName} must be an array`);
  }
}

export function assertIsObject(value: unknown, fieldName: string): asserts value is Record<string, unknown> {
  if (!isObject(value)) {
    throw new Error(`${fieldName} must be an object`);
  }
}







