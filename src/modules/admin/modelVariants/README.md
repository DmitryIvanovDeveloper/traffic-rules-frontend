# ModelVariants Module

## 🎯 Описание
Модуль для управления вариантами пользовательских моделей. Позволяет создавать конкретные экземпляры моделей с определенными значениями атрибутов и состояниями с ценами.

## 🏗️ Архитектура

### Business Layer
- **Entities**: `ModelVariant`, `ModelVariantAttribute`, `ModelVariantState`
- **Use Cases**: CRUD операции для вариантов моделей
- **DTOs**: Объекты передачи данных для API
- **Errors**: Специализированные ошибки модуля
- **Events**: События для интеграции с другими модулями

### Infrastructure Layer
- **HTTP Repository**: Работа с API
- **Local Repository**: Локальное хранение и кэширование
- **Container**: Dependency Injection конфигурация

### Presentation Layer
- **Controller**: Управление бизнес-логикой
- **Presenter**: Подготовка данных для UI
- **Views**: Vue компоненты

## 🎨 Функционал

### Основные возможности:
1. **Создание вариантов** - с атрибутами и состояниями
2. **Просмотр списка** - с фильтрацией по модели
3. **Редактирование** - изменение атрибутов и состояний
4. **Удаление** - с подтверждением
5. **Управление публикацией** - статус черновик/опубликовано

### Структура данных:
- **ModelVariant**: Основная сущность варианта
- **ModelVariantAttribute**: Конкретные значения атрибутов (key-value)
- **ModelVariantState**: Состояния с типом, ценой и изображением

## 🔧 Использование

### В компонентах:
```typescript
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { TYPES } from './types';
import ModelVariantsController from './presentation/controller/model-variants.controller';

const controller = container.get<ModelVariantsController>(TYPES.ModelVariantsController);
```

### API Endpoints:
- `GET /cards/admin/model_variants/?model_id={id}` - получить варианты модели
- `POST /cards/admin/model_variants/` - создать вариант
- `PUT /cards/admin/model_variants/{id}/` - обновить вариант
- `DELETE /cards/admin/model_variants/{id}/` - удалить вариант

## 📝 Пример использования

```typescript
// Создание варианта
await controller.createModelVariant(
    'model-id',
    'BMW X5 2023',
    [
        { key: 'Марка', value: 'BMW' },
        { key: 'Модель', value: 'X5' },
        { key: 'Год', value: 2023 }
    ],
    [
        { type: 1, image: 'https://example.com/new.jpg', price: 5000000 },
        { type: 2, image: 'https://example.com/used.jpg', price: 4000000 }
    ],
    true
);
```

## 🛡️ Безопасность
- Строгая типизация TypeScript
- Валидация входных данных
- Безопасная работа с API
- Обработка ошибок

Модуль готов к использованию! 🚀







