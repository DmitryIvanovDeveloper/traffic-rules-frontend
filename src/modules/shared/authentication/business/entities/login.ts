import LoginRequestDTO from "../dtos/login.dto";

export enum LoginType {
    Email,
    Phone,
}


export default class Login {
    public readonly type: LoginType = LoginType.Email;
    public readonly email: string;
    public readonly phone: string;
    public readonly password: string;

    constructor(
        type: LoginType = LoginType.Email,
        email: string = '',
        phone: string = '',
        password: string = ''
    ) {
        this.type = type;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    public updateWithEmail(email: string): this {
        return this.cloneWith({ email });
    }

    public updateWithPassword(password: string): this {
        return this.cloneWith({ password });
    }

    public updateWithPhone(phone: string): this {
        return this.cloneWith({ phone });
    }

    public updateWithType(type: LoginType): this {
        return this.cloneWith({ type });
    }

    public cloneWith(params: Partial<Login>): this {
        return new Login(
            params.type ?? this.type,
            params.email ?? this.email,
            params.phone ?? this.phone,
            params.password ?? this.password
        ) as this;
    }

    public toRequestDTO(): LoginRequestDTO {
        return new LoginRequestDTO(this);
    }

    public static create(): Login {
        return new Login()
    }
}