import { LoadAchievementInput } from "@/modules/admin/achievements/business/usecases/types/load-achievements";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadMembersInput, LoadMembersOutput } from "./types/load-members.type";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as ProjectsTYPES } from "@/modules/admin/projects/types";
import IMembersHttpRepository from "../plugins/members.http-repository.plugin";
import Result from "@/infrastructure/helpers/result";
import MemberNotLoadedError from "../errors/member-not-loaded.error";
import IMembersLocalRepository from "../plugins/members.local-repository.plugin";
import { LoadMemberInput, LoadMemberOutput } from "./types/load-member.type";
import { MemberProject } from "../entities/member-project";
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin";
import { AssignMemberProjectInput, AssignMemberProjectOutput } from "./types/assign-member-project.type";
import LoadMemberUseCase from "./load-member.usecase";

export default class AssignMemberToProjectUseCase implements BaseUseCase<AssignMemberProjectInput, AssignMemberProjectOutput> {

    constructor(
        @inject(TYPES.MembersHttpRepository)
        private readonly _httpRepository: IMembersHttpRepository,

        @inject(TYPES.MembersLocalRepository)
        private readonly _localRepository: IMembersLocalRepository,

        @inject(TYPES.LoadMemberUseCase)
        private readonly _loadMemberUseCase: LoadMemberUseCase,
    ) {}

    public async execute(input: AssignMemberProjectInput): Promise<AssignMemberProjectOutput> {
        const member = this._localRepository.getMember().value;
        if (!member) {
            return Result.failure();
        }

        const result = await this._httpRepository.assignMemberProject(input.projectId, member.id);
        if (!result.isSuccess) {
            return Result.failure();
        }
        
        const memberProject = this._localRepository.findMemberProject(input.projectId);
        if (!memberProject) {
            return Result.failure();
        }

        await this._loadMemberUseCase.execute({ id: member.id });
        
        return Result.success();
    }
}