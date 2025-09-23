import { v4 as uuid } from 'uuid';

export interface IUserProps {
    readonly id?: string;
    readonly email?: string;
    readonly access?: boolean;
}
export class User {
    public readonly id: string;
    public readonly email: string
    public readonly access: boolean;

    constructor(props: Partial<IUserProps>) {
        this.id = props.id ?? uuid();
        this.email = props.email ?? '';
        this.access = props.access ?? false;
    }

    public withUpdatedEmail(email: string) {
        return this.cloneWith({ email })
    }

    public withUpdatedAccrss(access: boolean) {
        return this.cloneWith({ access })
    }

    public cloneWith(props: Partial<IUserProps>) {
        return new User({
            id: this.id,
            access: props.access ?? this.access,
            email: props.email ?? this.email
        })
    }

    public create(): User {
        return new User({});
    }
}
