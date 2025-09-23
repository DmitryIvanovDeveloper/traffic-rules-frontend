import Result from '@/infrastructure/helpers/result';
import RegistrationRequestDTO from '../dtos/registration.dto';

export default interface IAuthenticationHttpRepository {

    readonly signUp: (signupDto: RegistrationRequestDTO) => Promise<Result<string>>;
    readonly signIn: (email: string, password: string) => Promise<Result<string>>
}
