import RegistrationRequestDTO from "@/modules/shared/authentication/business/dtos/registration.dto";

export default class SignUpRequest {
    public readonly user: {
        readonly email: string;
        readonly first_name: string;
        readonly last_name: string;
        readonly password: string;

    }
    public readonly userName: string;
    public readonly avatar: null;


    constructor(dto: RegistrationRequestDTO) {
        this.user = {
            email: dto.email,
            first_name: dto.name,
            last_name: dto.lastName,
            password: dto.password
        }
        this.avatar = null;
    }
}