import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import CreateProjectUseCase from "../../business/usecases/create-project.usecase";
import { ref } from "vue";
import Result from "@/infrastructure/helpers/result";
import SelectProjectUseCase from "../../business/usecases/select-project.usecase";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import SaveProjectEvent from "../../business/events/save-project-event";
import NextQuestionEvent from "@/modules/admin/questions/business/events/next-question-event";
import PreviouseQuestionEvent from "@/modules/admin/questions/business/events/previous-question-event";
import IProjectsLocalRepository from "../../business/plugins/projects.local.repository.plugin";
import DeleteProjectUseCase from "../../business/usecases/delete-project.usecase";

@injectable()
export default class ProjectsController {
    
    constructor(
        @inject(TYPES.CreateProjectUseCase)
        private readonly _createNewProjectUseCase: CreateProjectUseCase,

        @inject(TYPES.SelectProjectUseCase)
        private readonly _selectProjectUseCae: SelectProjectUseCase,

        @inject(TYPES.DeleteProjectUseCase)
        private readonly _deleteProjectUseCase: DeleteProjectUseCase,

        @inject(TYPES.ProjectsLocalRepository)
        private readonly _repoitory: IProjectsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,
    ) {}

    public readonly loading = ref<boolean>(false);
    public readonly isEdit = ref<boolean>(false);
    public readonly confirmCancelPopupVisible = ref<boolean>(false);
    public readonly creating = ref<boolean>(false);

    public createProject = async (): Promise<Result<void>> => {
        try {
            this.creating.value = true;
            return await this._createNewProjectUseCase.execute({name: 'Новый проект'});
        }
        finally {
            this.creating.value = false;
        }
    };

    public selectProject = async (projectId: string): Promise<Result<void>> => {
        this.loading.value = true;
        const result = await this._selectProjectUseCae.execute({ projectId: projectId });
        this.loading.value = false;
        return result;
    };

    public saveProject = async (): Promise<void> => {
        this.loading.value = true;
        await this._eventBus.publishAsync(new SaveProjectEvent());
        this.loading.value = false;
        this.confirmCancelPopupVisible.value = false;
    }

    public nextQuestion = (): void => {
        this._eventBus.publish(new NextQuestionEvent());
    }
    
    public previousQuestion = (): void => {
        this._eventBus.publish(new PreviouseQuestionEvent());
    }

    public updateName = (name: string): void => {
        const project = this._repoitory.getProject().value;
        if (!project) {
            return;
        }

        const updatedProject = project.withUpdatedName(name);
        this._repoitory.updateProjects(updatedProject);
    }

    public updatedAddUser = (projectId: string, email: string) => {
        if (!email) {
            return;
        }
        
        const projectResult = this._repoitory.findProjectById(projectId);
        if (!projectResult.hasData()) {
            return;
        }

        const project = projectResult.data;

        const updatedProject = project.withUpdatedNewUser(email);
        this._repoitory.updateProjects(updatedProject);
    }

    public updatedRemoveUser = (projectId: string, id: string) => {
        const projectResult = this._repoitory.findProjectById(projectId);
        if (!projectResult.hasData()) {
            return;
        }

        const project = projectResult.data;

        const updatedProject = project.withUpdatedRemovedUser(id);
        this._repoitory.updateProjects(updatedProject);
    }

    public edit = (edit: boolean): void => {
        this.isEdit.value = edit;
    }

    public async deleteProject(id: string): Promise<void> {
        
        const result = this._repoitory.findProjectById(id);
        if (!result.data) {
            return;
        }

        const project = result.data;
        
        const updatedProject = project.withUpdatedDeleting(true);
        this._repoitory.updateProjects(updatedProject);

        await this._deleteProjectUseCase.execute({ projectId: id} );
    }

    public changeConfirmCancelPopupVisible = () => {
        this.confirmCancelPopupVisible.value = !this.confirmCancelPopupVisible.value;
    }
}
