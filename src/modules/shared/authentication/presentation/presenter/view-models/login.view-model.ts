import Login, { LoginType } from './../../../business/entities/login';
export default class LoginViewModel {
    public readonly type: LoginType;
    public readonly phoneNumber: string;
    public readonly email: string;
    public readonly password: string;
    public readonly isRemember: boolean;

    constructor(entity: Login) {
        this.type = entity.type;
        this.phoneNumber = entity.phone;
        this.email = entity.email;
        this.password = entity.password;
    }
}