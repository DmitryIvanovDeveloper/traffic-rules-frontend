import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IMembersLocalRepository from "@/modules/admin/members/business/plugins/members.local-repository.plugin";
import LoadMembersUseCase from "../../business/usecases/load-members.usecase";
import LoadMemberUseCase from "../../business/usecases/load-member.usecase";
import { ref } from "vue";
import AssignMemberToProjectUseCase from "../../business/usecases/assign-member-project.usecase";
import UnAssignMemberToProjectUseCase from "../../business/usecases/unassign-member-project.usecase";

@injectable()
export default class MembersController {
   
   	constructor(
		@inject(TYPES.LoadMembersUseCase)
		private readonly _loadMembersUseCase: LoadMembersUseCase,

		@inject(TYPES.LoadMemberUseCase)
		private readonly _loadMemberUseCase: LoadMemberUseCase,

		@inject(TYPES.AssignMemberToProjectUseCase)
		private readonly _assignMemberToProjectUseCase: AssignMemberToProjectUseCase,

		@inject(TYPES.UnAssignMemberToProjectUseCase)
		private readonly _unassignMemberToProjectUseCase: UnAssignMemberToProjectUseCase
   	) {}

	public showRemovePopup = ref<boolean>(false);
	public loading = ref<Record<string, boolean>>({});

   	public async loadMembers(): Promise<void> {
		await this._loadMembersUseCase.execute();
	}

	public loadMember = async (id: number): Promise<void> => {
		await this._loadMemberUseCase.execute({ id });
	}

	public showRemoveMemberProjectPopup = async (show: boolean): Promise<void> => {
		this.showRemovePopup.value = show;
	}

	public async assign(projectId: string, active: boolean): Promise<void> {
		this.loading.value[projectId] = true;
        !active 
			? await this._assignMemberToProjectUseCase.execute({projectId}) 
        	: await this._unassignMemberToProjectUseCase.execute({projectId});
		this.loading.value[projectId] = false;
    }

	public async unassign(projectId: any): Promise<void> {
		this.loading.value[projectId] = true;
        await this._unassignMemberToProjectUseCase.execute({projectId});
		this.loading.value[projectId] = false;

    }
}
