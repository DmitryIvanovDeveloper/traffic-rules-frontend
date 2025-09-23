import ProjectViewModel from "./view-models/project.view-model";
import { inject } from "inversify";
import { TYPES } from "../../types";
import IProjectsLocalRepository from "../../business/plugins/projects.local.repository.plugin";
import { computed } from "@vue/reactivity";

export default class ProjectsPresenter {

    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _repository: IProjectsLocalRepository
    ) {}


    public readonly label = {
        title: 'Проекты',
        confirmCancel: {
            title: 'У вас есть несохраненные изменения. Пожалуйста, сохраните проект, чтобы отправить участникам актуальную версию.',
            saveContinue: 'Сохранить и продолжить',
            cancelContinue: 'Продолжить без сохранения',
        }
    }
    readonly projectViewModel =  computed(() => this.presentProject());
    readonly projectsViewModel = computed(() => {
        const projects =  this._repository.getProjects().value;
        if (!projects) {
            return undefined;
        }

        return projects.map(project => new ProjectViewModel(project))
    });

    private presentProject(): ProjectViewModel | null {
        const project = this._repository.getProject().value;
        if (!project) {
            return null;
        }

        
        return new ProjectViewModel(project);
    }
}