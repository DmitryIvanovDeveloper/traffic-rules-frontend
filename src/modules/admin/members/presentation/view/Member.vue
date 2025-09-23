<script setup lang="ts">
import Card from '@/ui/Card.vue';
import MemberTableHeader from './components/MemberTableHeader.vue';
import { Avatar, Button, Skeleton } from 'primevue';
import MemberTableItem from './components/MemberTableItem.vue';
import UniversalRoundedButton from '@/ui/Buttons/UniversalRoundedButton.vue';
import Delete from 'vue-material-design-icons/DeleteOutline.vue';
import RemoveMemberProjectPopup from './components/RemoveMemberProjectPopup.vue';

import { container } from '@/infrastructure/bootstrap/inversify.config';
import MembersController from '../controller/members.controller';
import MembersPresenter from '../presenter/members.presenter';
import { TYPES } from '../../types';
import { useRouter } from 'vue-router';
import AvatarIco from '@/assets/avatar.svg'
import { computed } from 'vue';

const controller = container.get<MembersController>(TYPES.MembersController);
const presenter = container.get<MembersPresenter>(TYPES.MembersPresenter);

const router = useRouter();

const loading = computed(() => {
    return presenter.memberProjects.value === undefined;
}) 
</script>

<template>
    <div class="flex flex-col w-full gap-[20px]">
        <Card title="Name" class="!h-[121px]">
            <div class="flex items-center gap-[20px]">
                <AvatarIco v-if="!presenter.member.value?.avatar"/>
                <Avatar
                    v-else
                    :icon="AvatarIco"
                    size="large"
                />
                <div>
                    <span class="block text-left text-[20px] font-roboto-700">{{presenter.member.value?.name}}</span>
                    <span class="block text-left">{{presenter.member.value?.email}}</span>
                </div>
            </div>
        </Card>

        <Card>
            <div class="flex flex-col gap-[5px]">
                <!-- <span class="block text-left text-[#7D8B91] ">Поиск теста</span> -->
                <MemberTableHeader title="Все тесты"/>
                <Skeleton v-if="loading"  class="!h-[25px]" v-for="() in ['', '', '']"/>
                <div
                    v-else
                    v-for="(project, index) in presenter.memberProjects.value" :key="index"
                    class="flex gap-[5px]">
                    <MemberTableItem class="!h-[30px]" :title="project.projectName" />
                    <UniversalRoundedButton 
                        :label="project.active.title"
                        class="!h-[30px]"
                        :handlePress="async () => { await controller.assign(project.projectId, project.active.value)}"
                        :type="project.active.value ? 'primary' : 'secondary'"
                        :loading="controller.loading.value[project.projectId]"
                    />
                    <!-- <Button unstyled :onclick="() => controller.showRemoveMemberProjectPopup(true)" class="p-[3px] bg-[#FFFFFF] rounded-[5px] cursor-pointer"> <Delete /></Button> -->
                </div>
            </div>
        </Card>
        <RemoveMemberProjectPopup />
    </div>
</template>