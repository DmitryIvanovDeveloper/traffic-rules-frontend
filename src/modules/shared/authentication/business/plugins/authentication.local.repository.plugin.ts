import Login from '../entities/login';
import Registration from '../entities/registration';
import { Ref } from 'vue';

export default interface IAuthenticationLocalRepository {
    getRegistration(): Ref<Registration | null>;
    storeRegistration(registration: Registration): void;

    getLogin(): Ref<Login | null>;
    storeLogin(login: Login): void;
}
