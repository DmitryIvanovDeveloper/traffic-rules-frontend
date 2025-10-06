# Типизация CustomModels модуля

Этот модуль использует строгую типизацию для защиты от ошибок времени выполнения и обеспечения безопасности данных.

## Структура типов

### 1. API Types (`api.types.ts`)
Содержит строгие типы для API запросов и ответов:
- `CustomModelApiRequest` - структура запроса к API
- `CustomModelApiResponse` - структура ответа от API
- `CreateCustomModelApiRequest` - создание модели
- `UpdateCustomModelApiRequest` - обновление модели

### 2. Validation Types (`validation.types.ts`)
Типы для валидации данных:
- `ValidationError` - структура ошибки валидации
- `ValidationResult` - результат валидации
- `CustomModelValidationRules` - правила валидации

### 3. Runtime Types (`runtime.types.ts`)
Типы для безопасной работы во время выполнения:
- `SafeCustomModelData` - безопасная структура данных
- `CustomModelError` - типизированные ошибки
- Функции для безопасного парсинга данных

### 4. Guards Types (`guards.types.ts`)
Type Guards для проверки типов:
- `isString`, `isNumber`, `isBoolean` - базовые проверки
- `isUUID`, `isEmail`, `isISODateString` - специализированные проверки
- `isCustomModelApiData` - проверка структуры модели
- `assertIsString`, `assertIsNumber` - утверждения типов

### 5. Constants Types (`constants.types.ts`)
Константы для валидации и типизации:
- `VALIDATION_CONSTANTS` - константы валидации
- `ERROR_CODES` - коды ошибок
- `HTTP_STATUS` - HTTP статус коды

## Использование

### Валидация входных данных
```typescript
const validation = CustomModelValidator.validateCreateInput(input);
if (!validation.isValid) {
  // Обработка ошибок валидации
}
```

### Безопасный парсинг API ответов
```typescript
const safeParseResult = safeParseCustomModel(apiResponse);
if (!safeParseResult.hasData()) {
  // Обработка ошибки парсинга
}
```

### Type Guards
```typescript
if (isCustomModelApiData(data)) {
  // TypeScript знает, что data имеет тип SafeCustomModelData
  const model = CustomModel.toEntity(data);
}
```

### Assertions
```typescript
assertIsString(name, 'name');
assertIsUUID(projectId, 'projectId');
```

## Преимущества

1. **Безопасность типов** - защита от ошибок времени выполнения
2. **Автодополнение** - IDE предоставляет точные подсказки
3. **Рефакторинг** - безопасное изменение кода
4. **Документация** - типы служат документацией API
5. **Валидация** - строгая проверка входных данных

## Интеграция с модулями

Все модули (`customModels`, `modelVariants`, `damageTypes`) используют аналогичную структуру типизации для обеспечения консистентности и безопасности во всем приложении.







