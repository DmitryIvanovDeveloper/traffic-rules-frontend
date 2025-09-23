<script setup lang="ts">
import Card from '@/ui/Card.vue';
import MemberTableHeader from './components/MemberTableHeader.vue';
import MemberTableRow from './components/MemberTableRow.vue';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import MembersController from '../controller/members.controller';
import { TYPES } from '../../types';
import MembersPresenter from '../presenter/members.presenter';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { RouterPaths } from '@/app/router/router-paths';
import { Skeleton } from 'primevue';
import { computed } from '@vue/reactivity';

const controller = container.get<MembersController>(TYPES.MembersController);
const presenter = container.get<MembersPresenter>(TYPES.MembersPresenter);

const router = useRouter();

onMounted(async () => {
    await controller.loadMembers()
})

const onClick = (id: number): void => {
    controller.loadMember(id)
    router.push(RouterPaths.member)
}

const loading = computed(() => {
    return presenter.membersViewModel.value === undefined;
}) 

</script>

<template>
    <div class="flex flex-col w-full gap-[20px] p-[20px]">
        <Card class="!w-full !h-[77px]">
            <div class="flex">
                <span>{{presenter.label.title}}</span>
            </div>
        </Card>

        <Card>
            <div class="flex flex-col gap-[5px]">
                <div class="flex w-full justify-between gap-[5px]">
                    <MemberTableHeader title="Участники"/>
                    <MemberTableHeader title="Email"/>
                    <MemberTableHeader title="Проектов"/>
                    <MemberTableHeader 
                        :title="''" 
                        class="!w-[80px] "
                    />
                </div>
                <Skeleton v-if="loading"  class="!h-[25px]" v-for="() in ['', '', '']"/>
                <div 
                    v-else
                    class="flex w-full justify-between gap-[5px]"
                    v-for="(member) in presenter.membersViewModel.value"
                >
                    <MemberTableRow
                        :name="member.name"
                        :email="member.email"
                        :tests="member.tests"
                        :onclick="() => onClick(member.id)"
                    />
                </div>
            </div>
        </Card>
    </div>

</template>