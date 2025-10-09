<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { TYPES } from '../../types';
import CustomModelsController from '../controller/custom-models.controller';
import CustomModelsPresenter from '../presenter/custom-models.presenter';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import ConstructorItemLayout from '@/ui/ConstructorItemLayout.vue';
import UniversalInput from '@/ui/UniversalInput.vue';
import ToggleSwitch from "primevue/toggleswitch";

const controller = container.get<CustomModelsController>(TYPES.CustomModelsController);
const presenter = container.get<CustomModelsPresenter>(TYPES.CustomModelsPresenter);

const modelName = ref<string>('');
const attributes = ref<Array<{ name: string; value: string }>>([]);
const states = ref<Array<{ type: number; image: string | null; price: number }>>([]);
const isPublished = ref<boolean>(false);
const currentModel = ref<any>(null); // Сохраняем ссылку на текущую модель

// Функция для инициализации данных модели
const initializeModelData = (model: any) => {
    console.log('🔄 initializeModelData вызвана с моделью:', model);
    
    if (model) {
        console.log('=== ИНИЦИАЛИЗАЦИЯ МОДЕЛИ ===');
        console.log('Модель:', model);
        console.log('model.name:', model.name);
        console.log('model.attributes:', model.attributes);
        console.log('model.states:', model.states);
        
        // Устанавливаем название
        modelName.value = model.name || 'Новая модель';
        console.log('✅ modelName.value установлено:', modelName.value);
        
        // Инициализируем атрибуты (если пусто - добавляем дефолтный)
        if (model.attributes && model.attributes.length > 0) {
            attributes.value = model.attributes.map((attr: any) => ({
                name: attr.key,
                value: Array.isArray(attr.values) ? attr.values.join(', ') : String(attr.values)
            }));
            console.log('✅ Атрибуты загружены из модели:', attributes.value);
        } else {
            // Дефолтный атрибут с примером значений
            attributes.value = [{ name: 'Марка', value: 'BMW, Audi, Mercedes' }];
            console.log('✅ Атрибуты установлены по умолчанию:', attributes.value);
        }
        
        // Инициализируем состояния (если пусто - добавляем дефолтные 4 состояния)
        if (model.states && model.states.length > 0) {
            states.value = [...model.states];
            console.log('✅ Состояния загружены из модели:', states.value);
        } else {
            // Дефолтные состояния: целая, поцарапанная, ломаная, разрушенная
            states.value = [
                { type: 0, image: null, price: 1000 },
                { type: 1, image: null, price: 750 },
                { type: 2, image: null, price: 500 },
                { type: 3, image: null, price: 250 }
            ];
            console.log('✅ Состояния установлены по умолчанию:', states.value);
        }
        
        isPublished.value = model.isPublished || false;
        console.log('✅ isPublished установлено:', isPublished.value);
        
        // Сохраняем ссылку на модель
        currentModel.value = model;
        console.log('✅ currentModel сохранен:', currentModel.value);
        
        console.log('🎯 Инициализация завершена. Финальные значения:');
        console.log('  modelName.value:', modelName.value);
        console.log('  attributes.value:', attributes.value);
        console.log('  states.value:', states.value);
        console.log('  isPublished.value:', isPublished.value);
        console.log('  currentModel.value:', currentModel.value);
    } else {
        console.log('❌ Модель не передана в initializeModelData');
        currentModel.value = null;
    }
};

// Инициализация данных модели
onMounted(() => {
    initializeModelData(presenter.customModelViewModel.value);
});

// Отслеживание изменений в presenter
watch(
    () => presenter.customModelViewModel.value,
    (newModel) => {
        initializeModelData(newModel);
    },
    { deep: true }
);

const addAttribute = () => {
    if (!attributes.value) attributes.value = [];
    attributes.value.push({ name: '', value: '' });
};

const removeAttribute = (index: number) => {
    if (attributes.value && attributes.value.length > 0) {
        attributes.value.splice(index, 1);
    }
};

const addState = () => {
    if (!states.value) states.value = [];
    states.value.push({ type: 0, image: null, price: 0 });
};

const removeState = (index: number) => {
    if (states.value && states.value.length > 1) {
        states.value.splice(index, 1);
    }
};

const handleFileUpload = (event: Event, stateIndex: number) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5MB');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target?.result as string;
        if (states.value[stateIndex]) {
            states.value[stateIndex].image = result;
        }
    };
    reader.readAsDataURL(file);
};

const removeImage = (stateIndex: number) => {
    if (states.value[stateIndex]) {
        states.value[stateIndex].image = null;
    }
};

const getDamageTypeName = (type: number): string => {
    const types = ['🟢 Целая модель', '🟡 Поцарапанная модель', '🟠 Ломаная модель', '🔴 Разрушенная модель'];
    return types[type] || 'Неизвестный тип';
};

const saveModel = async (): Promise<void> => {
    console.log('🔵 saveModel вызвана!');
    
    // Получаем модель из локального хранилища или presenter
    let model = currentModel.value;
    console.log('🔍 Ищем модель в currentModel.value:', model);
    console.log('🔍 presenter.customModelViewModel.value:', presenter.customModelViewModel.value);
    
    if (!model) {
        console.log('⚠️ Модель не найдена в currentModel, пытаемся получить из presenter');
        model = presenter.customModelViewModel.value;
        
        if (!model) {
            console.error('❌ Модель не найдена ни в currentModel, ни в presenter');
            alert('Ошибка: модель не найдена. Попробуйте перезагрузить страницу.');
            return;
        }
        
        console.log('✅ Получили модель из presenter, сохраняем в currentModel');
        currentModel.value = model;
    }

    console.log('=== СОХРАНЕНИЕ CUSTOM MODEL ===');
    console.log('ID модели:', model.id);
    console.log('Название из ref:', modelName.value);
    console.log('Название из model:', model.name);
    console.log('Название trim():', modelName.value?.trim());
    console.log('Название length:', modelName.value?.length);
    console.log('Атрибуты (raw):', attributes.value);
    console.log('Состояния (raw):', states.value);
    console.log('Опубликовано:', isPublished.value);
    console.log('Project ID:', model.projectId);
    
    // Проверяем, что название не пустое
    if (!modelName.value || modelName.value.trim() === '') {
        console.error('❌ Название модели пустое! modelName.value:', modelName.value);
        alert('Пожалуйста, введите название модели');
        return;
    }

    // Подготовка атрибутов
    const preparedAttributes = attributes.value.map(attr => ({
        key: attr.name,
        values: attr.value.split(',').map((v: string) => v.trim())
    }));
    console.log('🔧 Подготовленные атрибуты:', preparedAttributes);
    console.log('🔧 Состояния для отправки:', states.value);

    try {
        console.log('🚀 Вызываем controller.updateCustomModelWithData...');
        const result = await controller.updateCustomModelWithData(
            model.id,
            modelName.value,
            preparedAttributes,
            states.value,
            model.projectId,
            isPublished.value
        );

        console.log('📦 Результат от контроллера:', result);

        if (result.isSuccess) {
            console.log('✅ Модель успешно обновлена');
        } else {
            console.error('❌ Ошибка при обновлении модели:', result.errors);
        }
    } catch (error) {
        console.error('💥 Exception при сохранении:', error);
    }
};

const canSave = computed(() => {
    const hasName = modelName.value.trim() !== '';
    const hasAttributes = attributes.value.length > 0;
    const attributesFilled = attributes.value.every(attr => attr.name.trim() !== '' && attr.value.trim() !== '');
    const hasStates = states.value.length > 0;
    const statesValid = states.value.every(state => state.price >= 0);
    
    console.log('=== canSave проверка ===');
    console.log('Название заполнено:', hasName, '(', modelName.value, ')');
    console.log('Есть атрибуты:', hasAttributes, '(', attributes.value.length, ')');
    console.log('Атрибуты заполнены:', attributesFilled, attributes.value);
    console.log('Есть состояния:', hasStates, '(', states.value.length, ')');
    console.log('Состояния валидны:', statesValid);
    console.log('Итого canSave:', hasName && hasAttributes && attributesFilled && hasStates && statesValid);
    
    return hasName && hasAttributes && attributesFilled && hasStates && statesValid;
});
</script>

<template>
    <div v-if="presenter.customModelViewModel.value" class="flex flex-col gap-[20px]">

        <!-- Название модели -->
        <ConstructorItemLayout label="Название модели">
            <UniversalInput
                :value="modelName"
                :onChange="(value) => modelName = value as string"
                placeholder="Введите название модели"
                class="w-full"
            />
        </ConstructorItemLayout>

        <!-- Публикация -->
        <div class="flex justify-between p-[10px] bg-[#EFF6F8] rounded-lg">
            <span class="text-gray-700 font-medium">Опубликовать модель</span>
            <ToggleSwitch 
                name="published" 
                :modelValue="isPublished"
                @update:modelValue="(value) => isPublished = value" 
            />
        </div>

        <!-- Атрибуты -->
        <ConstructorItemLayout label="Атрибуты модели">
            <div class="space-y-4">
                <div 
                    v-for="(attribute, attrIndex) in attributes" 
                    :key="attrIndex"
                    class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white"
                >
                    <UniversalInput
                        :value="attribute.name"
                        :onChange="(value) => attribute.name = value as string"
                        placeholder="Название атрибута (например: Марка)"
                        class="flex-1"
                    />
                    <span class="text-gray-400">-</span>
                    <UniversalInput
                        :value="attribute.value"
                        :onChange="(value) => attribute.value = value as string"
                        placeholder="Значения через запятую (например: BMW, Audi, Geely)"
                        class="flex-1"
                    />
                    <button 
                        @click="removeAttribute(attrIndex)"
                        class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                    >
                        ✕
                    </button>
                </div>
                
                <button 
                    @click="addAttribute"
                    class="w-full py-3 border-2 border-dashed border-orange-300 text-orange-500 hover:border-orange-400 hover:text-orange-600 rounded-lg font-medium transition-colors"
                >
                    + Добавить атрибут
                </button>
            </div>
        </ConstructorItemLayout>

        <!-- Состояния модели -->
        <ConstructorItemLayout label="Состояния модели">
            <div class="space-y-4">
                <div 
                    v-for="(state, stateIndex) in states" 
                    :key="stateIndex"
                    class="border border-gray-200 rounded-lg p-4 bg-white"
                >
                    <div class="flex justify-between items-start mb-4">
                        <h5 class="text-lg font-semibold text-gray-800">Состояние {{ stateIndex + 1 }}</h5>
                        <button 
                            @click="removeState(stateIndex)"
                            class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                            :disabled="states.length <= 1"
                            title="Удалить состояние"
                        >
                            ✕
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Тип повреждения</label>
                                <select 
                                    v-model.number="state.type"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option :value="0">🟢 Целая модель</option>
                                    <option :value="1">🟡 Поцарапанная модель</option>
                                    <option :value="2">🟠 Ломаная модель</option>
                                    <option :value="3">🔴 Разрушенная модель</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Цена ($)</label>
                                <UniversalInput
                                    :value="state.price"
                                    :onChange="(value) => state.price = Number(value)"
                                    placeholder="Введите цену ($)"
                                    type="number"
                                    class="w-full"
                                />
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Изображение модели</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    @change="(e) => handleFileUpload(e, stateIndex)"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div v-if="state.image" class="mt-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Предпросмотр:</label>
                                <div class="relative inline-block">
                                    <img 
                                        :src="state.image" 
                                        :alt="getDamageTypeName(state.type)"
                                        class="w-32 h-32 object-cover rounded-lg border-2 border-white shadow-md"
                                    />
                                    <button
                                        type="button"
                                        @click="removeImage(stateIndex)"
                                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button 
                    @click="addState"
                    class="w-full py-3 border-2 border-dashed border-orange-300 text-orange-500 hover:border-orange-400 hover:text-orange-600 rounded-lg font-medium transition-colors"
                >
                    + Добавить состояние
                </button>
            </div>
        </ConstructorItemLayout>

        <!-- Кнопка сохранения -->
        <div class="pt-6 border-t border-gray-200">
            <!-- Подсказка, если кнопка заблокирована -->
            <div v-if="!canSave" class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p class="text-sm text-yellow-800">
                    ⚠️ Для сохранения модели необходимо:
                </p>
                <ul class="text-sm text-yellow-700 mt-2 ml-4 list-disc">
                    <li v-if="modelName.trim() === ''">Заполнить название модели</li>
                    <li v-if="attributes.length === 0">Добавить хотя бы один атрибут</li>
                    <li v-if="attributes.some(attr => attr.name.trim() === '' || attr.value.trim() === '')">Заполнить все поля атрибутов</li>
                    <li v-if="states.length === 0">Добавить хотя бы одно состояние</li>
                </ul>
            </div>
            
            <div class="flex justify-end">
                <button
                    @click="saveModel"
                    :disabled="!canSave || controller.updating.value"
                    class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                <span v-if="controller.updating.value" class="flex items-center space-x-2">
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Сохранение...</span>
                </span>
                <span v-else>Сохранить изменения</span>
            </button>
            </div>
        </div>
    </div>
    
    <div v-else class="flex items-center justify-center h-64">
        <p class="text-gray-500">Выберите модель для редактирования</p>
    </div>
</template>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
