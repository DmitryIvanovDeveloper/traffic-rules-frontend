<script setup lang="ts">
import ProjectSidebarItemLayout from "@/ui/ProjectSidebarItemLayout.vue";
import ProjectSidebarElementLayout from "@/ui/ProjectSidebarElementLayout.vue";
import { onMounted, ref } from "vue";

export interface ProjectItem {
  id: string;
  name: string;
  checked?: boolean;
  edited?: boolean;
  deleting: boolean;
  hasError?: boolean
  published?: boolean
}

export interface IProjectItemListProps {
  title: string;
  items: Array<ProjectItem>;
  onCreate: () => void;
  onEdit: (id: string) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onChecked: (id: string, checked: boolean) => void;
  onChangeOrder?: (fromId: string, toId: string) => void;
  selectedId: string;
  creating: boolean
  droppable?: boolean;
  checkable?: boolean;
}

const { title, items, onCreate, onEdit, onSelect, onDelete, onChangeOrder, selectedId, droppable, creating } =
  defineProps<IProjectItemListProps>();

const draggedItemId = ref<string | null>(null);
const dragOverItemId = ref<string | null>(null);

function onDragStart(itemId: string) {
    draggedItemId.value = itemId;
}

function onDragOver(e: DragEvent, targetItemId: string) {
    e.preventDefault();
    if (targetItemId !== draggedItemId.value) {
        dragOverItemId.value = targetItemId;
    }
}

function onDrop(targetItemId: string) {
    if (draggedItemId.value && targetItemId && draggedItemId.value !== targetItemId && !!onChangeOrder) {
      onChangeOrder(draggedItemId.value, targetItemId);
    }

    draggedItemId.value = null;
    dragOverItemId.value = null;
}
</script>

<template>
	
  <ProjectSidebarItemLayout :title="title" :onAdd="onCreate" :creating="creating">
    <div class="flex flex-col gap-[10px] w-full pl-6 overflow-auto max-h-[400px]">
      <div
        v-for="(item, index) in items"
            :key="item.id"
            :draggable="true"
            @dragstart="() => onDragStart(item.id)"
            @dragover="(e) => onDragOver(e, item.id)"
            @drop="() => onDrop(item.id)"
            :class="[
              dragOverItemId === item.id ? 'bg-purple-50' : '',
            ]"
        >

        <ProjectSidebarElementLayout
            :title="(item.name)"
            :onSelect="() => onSelect(item.id)"
            :onEdit="() => onEdit(item.id)"
            :onDelete="() => onDelete(item.id)"
            :onChecked="(value: boolean) => onChecked(item.id, value)"
            :deleting="item.deleting"
            :droppable="droppable"
            :selected="item.id === selectedId"
            :checkable="checkable ?? false"
            :edited="item.edited"
            :error="item.hasError"
            :published="item.published"
        />
      </div>
    </div>
  </ProjectSidebarItemLayout>
</template>
