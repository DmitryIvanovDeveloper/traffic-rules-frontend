import CreateProjectResponseDTO from "../dtos/create-project.dto";
import { CreateProjectRequestDTO } from "../dtos/create-project.dto";
import UpdateProjectResponseDTO from "../dtos/update-project.dto";
import ProjectsNameEmptyError from "../errors/projects-name-empty.error";
import ProjectsError from "../errors/projects.error";
import { CreateProjectInput } from "../usecases/types/create-project.type";
import { User } from "./user";
import { v4 as uuid } from 'uuid';

export interface IProjectProps {
    readonly id?: string;
    readonly name?: string;
    readonly created?: Date | undefined;
    readonly userId?: number;
    readonly edited?: boolean;
    readonly deleting?: boolean;
    readonly users?: ReadonlyArray<User>;
    readonly showError?: boolean;
}

export default class Project {
    public readonly id: string;
    public readonly name: string;
    public readonly created: Date | undefined;
    public readonly userId: number;
    public readonly edited: boolean;
    public readonly deleting: boolean;
    public readonly users: ReadonlyArray<User>
    public readonly showError: boolean;

    constructor(props: Partial<IProjectProps>) {
        this.id = props.id ?? uuid();
        this.name = props.name ?? '';
        this.created = props.created ?? undefined;
        this.userId = props.userId ?? -1;
        this.edited = props.edited ?? false;
        this.deleting = props.deleting ?? false;
        this.users = props.users ?? [];
        this.showError = props.showError ?? false;

    }

    public withUpdatedName(name: string): this {
        return this.cloneWith({ name, edited: true });
    }

    public withUpdatedDeleting(deleting: boolean): this {
        return this.cloneWith({ deleting });
    }

    public withUpdatedUserAccess(user: User): this {
        const updatedUser = [...this.users, user]
        return this.cloneWith({ users: updatedUser });
    }

    public withUpdatedRemovedUser(id: string): this {
        const updatedUsers = this.users.filter(userAccess => userAccess.id !== id);
        return this.cloneWith({ users: updatedUsers });
    }

    public withUpdatedNewUser(email: string): this {
        const updatedUsers = [...this.users, new User({ email })];
        return this.cloneWith({ users: updatedUsers });
    }

    public withUpdatedShowError(): this {
        return this.cloneWith({ showError: true });
    }

    public validate(): ReadonlyArray<ProjectsError> {
        const errors = new Array<ProjectsError>();

        if (!this.name) {
            const error = new ProjectsNameEmptyError();
            errors.push(error);
        }

        return errors;
    }

    public cloneWith(params: Partial<IProjectProps>): this {
        return new Project({
            id: this.id,
            name: params.name ?? this.name,
            created: params.created ?? this.created,
            userId: params.userId ?? this.userId,
            edited: params.edited ?? this.edited,
            deleting: params.deleting ?? this.deleting,
            users: params.users ?? this.users,
            showError: params.showError ?? this.showError,
        }) as this;
    }

    static toEntity(dto: CreateProjectResponseDTO | UpdateProjectResponseDTO): Project {
        return new Project({
            id: dto.id, 
            name: dto.name, 
            created: dto.created, 
            userId: dto.userId
        });
    }

    static toRequestDto(input: CreateProjectInput): CreateProjectRequestDTO {
        return {
            name: input.name
        };
    }
    
}
