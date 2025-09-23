import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as ProjectsTYPES } from "@/modules/admin/projects/types";
import IMembersHttpRepository from "../plugins/members.http-repository.plugin";
import Result from "@/infrastructure/helpers/result";
import IMembersLocalRepository from "../plugins/members.local-repository.plugin";
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin";
import { AssignMemberProjectInput, AssignMemberProjectOutput } from "./types/assign-member-project.type";
import { UnAssignMemberProjectInput, UnAssignMemberProjectOutput } from "./types/unassign-member-project.type";
import LoadMemberUseCase from "./load-member.usecase";

export default class UnAssignMemberToProjectUseCase implements BaseUseCase<UnAssignMemberProjectInput, UnAssignMemberProjectOutput> {

    constructor(
        @inject(TYPES.MembersHttpRepository)
        private readonly _httpRepository: IMembersHttpRepository,

        @inject(TYPES.MembersLocalRepository)
        private readonly _localRepository: IMembersLocalRepository,

        @inject(TYPES.LoadMemberUseCase)
        private readonly _loadMemberUseCase: LoadMemberUseCase,
    ) {}

    public async execute(input: UnAssignMemberProjectInput): Promise<UnAssignMemberProjectOutput> {
        const member = this._localRepository.getMember().value;
        if (!member) {
            return Result.failure();
        }

        const memberProject = this._localRepository.findMemberProject(input.projectId);
        if (!memberProject) {
            return Result.failure();
        }

        const result = await this._httpRepository.unassignMemberProject(memberProject.id);
        if (!result.isSuccess) {
            return Result.failure();
        }
        
        await this._loadMemberUseCase.execute({ id: member.id });

        return Result.success();
    }
}