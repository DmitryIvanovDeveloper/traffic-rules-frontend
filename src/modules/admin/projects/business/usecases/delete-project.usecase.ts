import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IProjectsHttpRepository from "../plugins/projects.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { DeleteProjectInput, DeleteProjectOutput } from "./types/delete-project.type";
import ProjectNotDeletedError from "../errors/project-not-deleted.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ProjectDeletedEvent from "../events/project-deleted-event";
import { ToastNotificationUseCases } from "@/modules/shared/notification/business/usecases/toast-notification.usecases";
import DeleteProjectLocalUseCase from "./delete-project-local.usecase";

@injectable()
export default class DeleteProjectUseCase extends BaseUseCase<DeleteProjectInput, DeleteProjectOutput> {
    constructor(
        @inject(TYPES.ProjectsHttpRepository)
        private readonly _projectsRepository: IProjectsHttpRepository,

        @inject(TYPES.DeleteProjectLocalUseCase)
        private readonly _deleteProjectLocalUseCase: DeleteProjectLocalUseCase,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,

        @inject(SharedTYPES.ToastNotificationUseCases)
        private readonly _toastNotificationUseCases: ToastNotificationUseCases
    ) {
        super()
    }

    public execute = async (input: DeleteProjectInput): Promise<DeleteProjectOutput> => {

        const result = await this._projectsRepository.deleteProject(input.projectId);
        if (!result.isSuccess) {
            return Result.failure(new ProjectNotDeletedError(input.projectId));
        }

        this._deleteProjectLocalUseCase.execute(input);

        this._toastNotificationUseCases.success("Project successfully deleted");

        await this._eventBus.publishAsync(new ProjectDeletedEvent(input.projectId));
        
        return Result.success();
    }
}