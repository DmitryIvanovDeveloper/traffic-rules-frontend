import { IEvent } from "@/infrastructure/events/event";

export default class QuestionsLoadedEvent implements IEvent {
    readonly type = 'QuestionsLoadedEvent';

    public questions: ReadonlyArray<{id: string, name: string}> = [];

    constructor(questionsId: ReadonlyArray<{id: string, name: string}>) {
        this.questions = questionsId;
    }
    
}
