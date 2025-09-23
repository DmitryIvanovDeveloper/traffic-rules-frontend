import ViewModelField from "@/modules/shared/view-models/view-model-field";
import Level from "../../business/entities/level";
import LevelsError from "../../business/errors/levels.error";
import LevelNameEmptyError from "../../business/errors/level-name-empty.error";

export default class LevelViewModel {
    public  readonly id: string;
    public readonly name: ViewModelField = new ViewModelField();
    public readonly deleting: boolean;
    public readonly edited: boolean;
    public hasError: boolean;

    constructor(entity: Level) {
        this.id = entity.id;
        this.name.value = entity.name;
        this.edited = entity.edited;
        this.deleting = entity.deleting;
        this.hasError = false;
        if (!entity.showError) return;

        this.setErrors(entity.validate());

        console.log(this.name)

    }

    public setErrors(errors: ReadonlyArray<LevelsError>): void {
        errors.forEach(error => {
            this.hasError = true;

            if (error instanceof LevelNameEmptyError) {
               this.name.error = 'Введите название уровня';
            }
        });

        
    }
}