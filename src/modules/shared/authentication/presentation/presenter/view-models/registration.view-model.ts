import { RegistrationType } from "../../../business/dtos/registration-type";
import Registration from "../../../business/entities/registration";

export default class RegistrationViewModel {
    public type: RegistrationType;
    public company: string;
    public name: string;
    public lasName: string;
    public email: string;
    public phone: string;
    public password: string;
    public confirmPassword: string;

    constructor(entity: Registration) {
        this.type = entity.type;
        this.company = entity.company;
        this.name = entity.name;
        this.lasName = entity.lasName;
        this.email = entity.email;
        this.phone = entity.phone;
        this.password = entity.password;
        this.confirmPassword = entity.confirmPassword;
    }
}