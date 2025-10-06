import {
    ILevelCreateRequestDTO,
    ILevelCreateResponseDTO,
} from "../dtos/level.create.dto";
import { ILevelUpdateRequestDTO } from "../dtos/level.update.dto";
import LevelNameEmptyError from "../errors/level-name-empty.error";
import LevelsError from "../errors/levels.error";

export interface LevelProps {
    readonly id: string;
    readonly name: string;
    readonly lang: string;
    readonly projectId: string;
    readonly edited: boolean;
    readonly deleting: boolean;
    readonly showError: boolean;

}

export default class Level {
    public readonly id: string;
    public readonly name: string;
    public readonly lang: string;
    public readonly projectId: string;
    public readonly edited: boolean;
    public readonly deleting: boolean;
    public readonly showError: boolean;

    constructor(props: Partial<LevelProps>){
        this.id = props.id ?? '';
        this.name = props.name ?? '';
        this.lang = props.lang ?? '';
        this.projectId = props.projectId ?? '';
        this.edited = props.edited ?? false;
        this.deleting = props.deleting ?? false;
        this.showError = props.showError ?? false;

        console.log(this.name)

    }

    public withUpdatedName(name: string): this {
        return this.cloneWith({ name, edited: true });
    }

    public withUpdatedDeleting(deleting: boolean): this {
        return this.cloneWith({ deleting });
    }

    public withUpdatedEdited(edited: boolean): this {
        return this.cloneWith({ edited });
    }

    public withUpdatedShowErrors(): this {
        return this.cloneWith({ showError: true });
    }

    public cloneWith(params: Partial<LevelProps>): this {
        return new Level({
            id: this.id,
            name: params.name ?? this.name,
            lang: params.lang ?? this.lang,
            projectId: params.projectId ?? this.projectId,
            edited: params.edited ?? this.edited,
            deleting: params.deleting ?? this.deleting,
            showError: params.showError ?? this.showError,
        }) as this;
    }

    public validate(): ReadonlyArray<LevelsError> {
        const errors = new Array<LevelsError>();

        if (!this.name) {
            const error = new LevelNameEmptyError();
            errors.push(error);
        }

        return errors;
    }

    public toCreateRequest(): ILevelCreateRequestDTO {
        return {
            level: this.name,
            lang: this.lang,
            projectId: this.projectId,
        };
    }

    public toUpdateRequest(): ILevelUpdateRequestDTO {
        return {
            level: this.name,
            lang: this.lang,
            projectId: this.projectId,
        };
    }

    public toResponseDto(): ILevelCreateResponseDTO {
        return {
            id: this.id,
            level: this.name,
            lang: this.lang,
            projectId: this.projectId,
        };
    }

    static toEntity(dto: ILevelCreateResponseDTO): Level {
        // Проверяем обязательные поля
        if (!dto.id || !dto.level || !dto.lang || !dto.projectId) {
            throw new Error(`Invalid Level data: missing required fields. Data: ${JSON.stringify(dto)}`);
        }

        return new Level({
            id: dto.id,
            name: dto.level,
            lang: dto.lang,
            projectId: dto.projectId,
        });
    }

    static create(name: string, lang: string, projectId: string): Level {
        return new Level({
            name, 
            lang, 
            projectId
        });
    }
}
