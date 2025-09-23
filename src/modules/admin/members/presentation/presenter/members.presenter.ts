import IMembersLocalRepository from "@/modules/admin/members/business/plugins/members.local-repository.plugin";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { computed } from "vue";
import MembersLocalRepository from "../../infrastructure/repositories/members.local-repository";
import MemberViewModel from "./view-models/member.view-model";
import MemberProjectViewModel from "./view-models/member-project.view-model";

@injectable()
export default class MembersPresenter {
	constructor(
		@inject(TYPES.MembersLocalRepository)
		private readonly _localRepository: MembersLocalRepository
	) {}

	public label = {
		title: 'Участники'
	}

	public readonly membersViewModel = computed(() => {
		const members = this._localRepository.getMembers().value;
		console.log(members)

		if (!members) {
			return;
		}

		return members.map(member => new MemberViewModel(member));
	});

	public readonly member = computed(() => {
		const member = this._localRepository.getMember().value;
		if (!member) {
			return undefined;
		}

		return new MemberViewModel(member);
	});

	public readonly memberProjects = computed(() => {
		const memberProjects = this._localRepository.getMemberProjects().value;
		if (!memberProjects) {
			return;
		}

		return memberProjects.map(mp => new MemberProjectViewModel(mp));
	});
}
