import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { DeleteProjectInput, DeleteProjectOutput } from "./types/delete-project.type";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { ToastNotificationUseCases } from "@/modules/shared/notification/business/usecases/toast-notification.usecases";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";

@injectable()
export default class DeleteProjectLocalUseCase extends BaseUseCase<DeleteProjectInput, DeleteProjectOutput> {
    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _localRepository: IProjectsLocalRepository,

        @inject(SharedTYPES.ToastNotificationUseCases)
        private readonly _toastNotificationUseCases: ToastNotificationUseCases
    ) {
        super()
    }

    public execute = async (input: DeleteProjectInput): Promise<DeleteProjectOutput> => {
        const projects = this._localRepository.getProjects().value
        const filteredProjects = projects.filter(project => project.id !== input.projectId);
        this._localRepository.storeProjects(filteredProjects);

        this._toastNotificationUseCases.success("Project successfully deleted");
        return Result.success();
    }
}