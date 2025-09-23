import { inject } from "inversify"
import { TYPES } from "../../types"
import { TYPES as ProjectTYPES } from "@/modules/admin/projects/types"

import SelectLevelUseCase from "../../business/usecases/select-level.usecase"
import CreateLevelUseCase from "../../business/usecases/create-level.usecase"
import Result from "@/infrastructure/helpers/result"
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin"
import LevelNotCreatedError from "../../business/errors/level-not-created.error"
import ILevelsLocalRepository from "../../business/plugins/levels.local.repository.plugin"
import DeleteLevelUseCase from "../../business/usecases/delete-level.usecase"
import { ref } from "vue"

export default class LevelsController  {
	
    
    constructor(
        @inject(TYPES.SelectLevelUseCase)
        private readonly _selectLevelUseCase: SelectLevelUseCase,

        @inject(TYPES.CreateLevelUseCase)
        private readonly _createLevelUseCase: CreateLevelUseCase,

        @inject(ProjectTYPES.ProjectsService)
        private readonly _projectsService: IProjectsService,

        @inject(TYPES.LevelsLocalRepository)
        private readonly _repository: ILevelsLocalRepository,

        @inject(TYPES.DeleteLevelUseCase)
        private readonly _deleteLevelUseCase: DeleteLevelUseCase,
    ){}  

    public readonly creating = ref<boolean>(false);

    public createLevel = async (): Promise<Result<void>> => {
        const result = this._projectsService.getSelectedProjectId();
        if (!result.hasData()) {
            return Result.failure(new LevelNotCreatedError())
        }

        try {
            this.creating.value =  true;
            return await this._createLevelUseCase.execute({ name: 'Новая категория', projectId: result.data });
        }
        finally {
            this.creating.value = false;
        }
    }

    public selectLevel = async (levelId: string): Promise<Result<void>> => {
        return await this._selectLevelUseCase.execute({ levelId: levelId });
    }

    public updateText(id: string ,text: string): void {
        const result = this._repository.findLevelById(id);
        if (!result.hasData()) {
            return;
        }

        const level = result.data;

        const updatedLevel = level.withUpdatedName(text);
        this._repository.updateLevel(updatedLevel);
    }

    public deleteLevel = async (id: string): Promise<void> => {
        const result = this._repository.findLevelById(id);
        if (!result.data) return;

        const level = result.data;

        const updatedLevel = level.withUpdatedDeleting(true);
        this._repository.updateLevel(updatedLevel);
        
        await this._deleteLevelUseCase.execute({ levelId: id }); 
	}
} 