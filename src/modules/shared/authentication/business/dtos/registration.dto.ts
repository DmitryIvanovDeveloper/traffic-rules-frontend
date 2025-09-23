import Registration from "../entities/registration";
import { RegistrationType } from "./registration-type";

export default class RegistrationRequestDTO {
    type: RegistrationType
    company: string;
    name: string;
    lastName: string;
    email:  string;
    phone: string;
    password: string;
    confirmPassword: string;

    constructor(entity: Registration) {
        this.type = entity.type;
        this.company = entity.company;
        this.name = entity.name;
        this.lastName = entity.lasName;
        this.email = entity.email;
        this.phone = entity.phone;
        this.password = entity.password;
        this.confirmPassword = entity.confirmPassword;
    }
}
