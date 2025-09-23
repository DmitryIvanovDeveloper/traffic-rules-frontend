import ViewModelField from "@/modules/shared/view-models/view-model-field";
import Project from "../../../business/entities/project";
import { User } from "../../../business/entities/user";
import ProjectsNameEmptyError from "../../../business/errors/projects-name-empty.error";
import ProjectsError from "../../../business/errors/projects.error";

export default class ProjectViewModel {
    public readonly id: string;
    public readonly name: ViewModelField = new ViewModelField();
    public readonly created: Date | undefined;
    public readonly edited: boolean;
    public readonly deleting: boolean;
    public readonly users: Array<UserViewModel>;
    public hasError: boolean;

    constructor(project: Project) {
        this.id = project.id;
        this.name.value = project.name;
        this.created = project.created ?? undefined;
        this.edited = project.edited;
        this.deleting = project.deleting;
        this.users = project.users.map(user => new UserViewModel(user));
        this.hasError = false;

        if (!project.showError) return;

        this.setErrors(project.validate());
    }

    public setErrors(errors: ReadonlyArray<ProjectsError>): void {
        errors.forEach(error => {
            this.hasError = true;

            if (error instanceof ProjectsNameEmptyError) {
                this.name.error = ' '
            }
        } )
    }
}

export class UserViewModel {
    readonly id: string;
    readonly email: string;
    readonly access: boolean;

    constructor(user: User) {
        this.id = user.id
        this.email = user.email
        this.access = user.access
    }
}

