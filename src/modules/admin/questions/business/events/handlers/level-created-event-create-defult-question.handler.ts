import { IAsyncEventHandler } from "@/infrastructure/events/events-handler.plugin";
import { TYPES } from "../../../types";
import { inject } from "inversify";
import CreateQuestionUseCase from "../../usecases/create-question.usecase";
import LevelCreatedEvent from "@/modules/admin/levels/business/events/level-created-event";

export default class LevelCreatedEventCreateDefaultQuestionHandler
  implements IAsyncEventHandler<LevelCreatedEvent>
{
  constructor(
    @inject(TYPES.CreateQuestionUseCase)
    private readonly _createQuestionUseCase: CreateQuestionUseCase
  ) {}

  canHandle(event: LevelCreatedEvent): boolean {
    return event instanceof LevelCreatedEvent;
  }

  async handleAsync(event: LevelCreatedEvent): Promise<void> {
      await this._createQuestionUseCase.execute({ levelId: event.levelId });
  }
}
