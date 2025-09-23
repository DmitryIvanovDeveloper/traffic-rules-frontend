import { LoadAchievementInput } from "@/modules/admin/achievements/business/usecases/types/load-achievements";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadMembersInput, LoadMembersOutput } from "./types/load-members.type";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as ProjectsTYPES } from "@/modules/admin/projects/types";
import IMembersHttpRepository from "../plugins/members.http-repository.plugin";
import Result from "@/infrastructure/helpers/result";
import MemberNotLoadedError from "../errors/member-not-loaded.error";
import { Member } from "../entities/member";
import IMembersLocalRepository from "../plugins/members.local-repository.plugin";
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin";

export default class LoadMembersUseCase implements BaseUseCase<LoadMembersInput, LoadMembersOutput> {

    constructor(
        @inject(TYPES.MembersHttpRepository)
        private readonly _httpRepository: IMembersHttpRepository,

        @inject(TYPES.MembersLocalRepository)
        private readonly _localRepository: IMembersLocalRepository,

        @inject(ProjectsTYPES.ProjectsService)
        private readonly _projectsService: IProjectsService
    ) {}

    public async execute(input: LoadMembersInput): Promise<LoadMembersOutput> {
        this._localRepository.clearMembers()
        const result = await this._httpRepository.loadMembers();
        if (!result.hasData()) {
            return Result.failure(new MemberNotLoadedError());
        }

        const projects = this._projectsService.getProjects();

        const entities = await Promise.all(result.data.map(async member => {
            const resultProjects = await this._httpRepository.loadMemberProjects(member.id);
            if (!resultProjects.hasData()) {
                return Member.toEntity(member);
            }

            var tests = 0
            projects.forEach(project => {
                const exist = resultProjects.data.some(member => member.projectId === project.id);
                tests += exist ? 1: 0
            });

            return Member.toEntity(member, tests);
        }));

        

        this._localRepository.storeMembers(entities);

        return Result.success();
    }
}