import Login, { LoginType } from "../entities/login";

export default class LoginRequestDTO {
    public readonly type: LoginType;
    public readonly email:  string;
    public readonly phone: string;
    public readonly password: string;

    constructor(login: Login) {
        this.type = login.type;
        this.email = login.email;
        this.phone = login.phone;
        this.password = login.password;
    }
}
