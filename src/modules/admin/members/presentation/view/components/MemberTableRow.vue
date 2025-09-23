<script setup lang="ts">
import MemberTableItem from './MemberTableItem.vue';

export interface IMemberTableItemProps {
    name: string
    email: string
    tests: number
}

const { name, email, tests } = defineProps<IMemberTableItemProps>();

</script>

<template>
    <div class="flex w-full justify-between gap-[5px]">
        <MemberTableItem :title="name"/>
        <MemberTableItem :title="email"/>
        <MemberTableItem :title="tests"/>
        <MemberTableItem class="!w-[80px]" :title="''"/>
    </div>
</template>