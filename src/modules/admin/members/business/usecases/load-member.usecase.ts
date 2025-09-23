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

export default class LoadMemberUseCase implements BaseUseCase<LoadMemberInput, LoadMemberOutput> {

    constructor(
        @inject(TYPES.MembersHttpRepository)
        private readonly _httpRepository: IMembersHttpRepository,

        @inject(TYPES.MembersLocalRepository)
        private readonly _localRepository: IMembersLocalRepository,

        @inject(ProjectsTYPES.ProjectsService)
        private readonly _projectsService: IProjectsService
    ) {}

    public async execute(input: LoadMemberInput): Promise<LoadMemberOutput> {
        this._localRepository.clear();
        const member = this._localRepository.findMember(input.id);
        if (!member) {
            return Result.failure();
        }

        const result = await this._httpRepository.loadMemberProjects(input.id);
        if (!result.hasData()) {
            return Result.failure(new MemberNotLoadedError());
        }

        const projects = this._projectsService.getProjects();
       
        const entities = projects.map(project => {
            const expectedProject = result.data.find(member => member.projectId === project.id);
            return MemberProject.toEntity(expectedProject?.id ?? -1, project.id, project.name, !!expectedProject);
        });

        this._localRepository.storeMemberProjects(entities);
        this._localRepository.storeMember(member);
        return Result.success();
    }
}