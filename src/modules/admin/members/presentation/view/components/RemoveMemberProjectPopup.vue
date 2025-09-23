<script setup lang="ts">
import { Dialog } from 'primevue';
import { container } from "@/infrastructure/bootstrap/inversify.config";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import { TYPES } from '../../../types';
import { useRouter } from 'vue-router';
import { RouterPaths } from '@/app/router/router-paths';
import MembersController from '../../controller/members.controller';
import MembersPresenter from '../../presenter/members.presenter';

const controller = container.get<MembersController>(TYPES.MembersController);
const presenter = container.get<MembersPresenter>(TYPES.MembersPresenter);

const router = useRouter() 
const confirmCancel = () => {
    console.log('confirmCancel')
   
}

const confirmSave = async () => {}
</script>

<template>
    <Dialog
        :visible="controller.showRemovePopup.value"
        class="!flex" 
        pt:root:class="!flex !border-0 !bg-[#EFF6F8] w-[600px] h-[300px] p-[70px] justify-center items-center" 
        pt:mask:class="backdrop-blur-sm " 
        :closable="true"
    >
        <template #container>
            <div class="flex flex-col px-4 gap-6 rounded-[20px] justify-center items-center gap-[60px]">
                <div class="relative flex items-center">
                    <span class="text-[#7D8B91]">{{ 'Вы действительно хотите удалить тест' }}</span>
                </div>
    
                <div class="flex justufy-between items-center gap-4">
                    <UniversalRoundedButton 
                        :label="'Нет'" 
                        :loading="false" 
                        class="!h-[40px] !bg-[#9747FF] !border-none !font-roboto-700 !text-[14px]" 
                        :handle-press="() => controller.showRemoveMemberProjectPopup(false)"
                    />
                    

                    <UniversalRoundedButton 
                        type="secondary" 
                        :label="'Да'" 
                        :loading="false" 
                        class="!h-[40px] !border-[#9747FF] !border-[1px] !bg-transparent !text-[#9747FF] !font-roboto-700 !text-[14px]"
                        :handle-press="() =>  controller.showRemoveMemberProjectPopup(false)"
                    />
                        
                </div>
            </div>
        </template>
       
    </Dialog>
</template>