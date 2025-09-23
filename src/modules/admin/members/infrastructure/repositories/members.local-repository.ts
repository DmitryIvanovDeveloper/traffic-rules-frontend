import { ref, Ref } from "vue";
import IMembersLocalRepository from "@/modules/admin/members/business/plugins/members.local-repository.plugin";
import { Member } from "../../business/entities/member";
import { MemberProject } from "../../business/entities/member-project";

export default class MembersLocalRepository implements IMembersLocalRepository {
	
	private _members = ref<ReadonlyArray<Member> | undefined>(undefined);
	private _member = ref<Member | undefined>();
	private _memberProjects = ref<ReadonlyArray<MemberProject> | undefined>(undefined);

	public storeMembers(entities: ReadonlyArray<Member>): void {
		this._members.value = entities;
	}

	public getMembers(): Ref<ReadonlyArray<Member> | undefined> {
		return this._members;
	}

	public storeMember(entity: Member): void {
		this._member.value = entity;
	}

	public getMember(): Ref<Member | undefined> {
		return this._member;
	}

	public findMember(id: number): Member | undefined {
		return this._members.value?.find(member => member.id === id)
	}

	public getMemberProjects(): Ref<ReadonlyArray<MemberProject> | undefined> {
		return this._memberProjects;
	}

	public storeMemberProjects(entity: ReadonlyArray<MemberProject>): void {
		this._memberProjects.value = entity;
	}

	public updateMemberProjects(entity: MemberProject): void {
		if (!this._memberProjects.value) {
			return;
		}
		const expectedIndex = this._memberProjects.value.findIndex(memberProject => memberProject.projectId === entity.projectId);
		if (expectedIndex === -1) {
			return;
		}
		
		const copy = [...this._memberProjects.value];
		copy[expectedIndex] = entity;

		this._memberProjects.value = copy;
	}

	public findMemberProject(id: string): MemberProject | undefined {
		return this._memberProjects.value?.find(mp => mp.projectId === id);
	}

	public clear(): void {
		this._member.value = undefined;
	}

	public clearMembers(): void {
		this._members.value = undefined;
	}
}
