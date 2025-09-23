import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { TYPES as LevelTYPES} from "@/modules/admin/levels/types";
import { inject } from "inversify";
import SaveProjectEvent from "@/modules/admin/projects/business/events/save-project-event";
import ILevelsService from "@/modules/admin/levels/business/plugins/levels.service.plugin";
import UpdateLevelUseCase from "../../usecases/update-level.usecase";

export default class SaveProjectEventUpdateLevelHandler implements IAsyncEventHandler<SaveProjectEvent> {
  constructor(
      @inject(TYPES.UpdateLevelUseCase)
      private readonly _updateQuestionUseCase: UpdateLevelUseCase,

      @inject(LevelTYPES.LevelsService)
      private readonly _levelsService: ILevelsService,
  ) {}

  canHandle(event: SaveProjectEvent): boolean {
    return event instanceof SaveProjectEvent;
  }

  async handleAsync(event: SaveProjectEvent): Promise<void> {
        const result = this._levelsService.getSelectedLevelId();
        if (!result.hasData()) {
            return;
        }

        await this._updateQuestionUseCase.execute({ projectId: event.projectId });
    }
}
