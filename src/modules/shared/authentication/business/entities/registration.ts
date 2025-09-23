import { RegistrationType } from "../dtos/registration-type"
import RegistrationRequestDTO from "../dtos/registration.dto";

export default class Registration {

    public type: RegistrationType;
    public company: string;
    public name: string;
    public lasName: string;
    public email: string;
    public phone: string;
    public password: string;
    public confirmPassword: string;

    constructor(
        type: RegistrationType = RegistrationType.Personal,
        company: string = '',
        name: string = '',
        lasName: string = '',
        email: string = '',
        phone: string = '',
        password: string = '',
        confirmPassword: string = ''
    ) {
        this.type = type;
        this.company = company;
        this.name = name;
        this.lasName = lasName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public updateWithEmail(email: string): this {
        return this.cloneWith({ email });
    }

    public updateWithPassword(password: string): this {
        return this.cloneWith({ password });
    }

    public updateWithConfirmPassword(confirmPassword: string): this {
        return this.cloneWith({ confirmPassword });
    }

    public updateWithPhone(phone: string): this {
        return this.cloneWith({ phone });
    }

    public updateWithCompany(company: string): this {
        return this.cloneWith({ company });
    }

    public updateWithName(name: string): this {
        return this.cloneWith({ name });
    }

    public updateWithLastName(lasName: string): this {
        return this.cloneWith({ lasName });
    }

    public updateWithType(type: RegistrationType): this {
        return this.cloneWith({ type });
    }

    public cloneWith(params: Partial<Registration>): this {
        return new Registration(
            params.type ?? this.type,
            params.company ?? this.company,
            params.name ?? this.name,
            params.lasName ?? this.lasName,
            params.email ?? this.email,
            params.phone ?? this.phone,
            params.password ?? this.password,
            params.confirmPassword ?? this.confirmPassword
        ) as this;
    }

    public toRequestDTO(): RegistrationRequestDTO {
        return new RegistrationRequestDTO(this);
    }

    public static create(): Registration {
        return new Registration()
    }
}