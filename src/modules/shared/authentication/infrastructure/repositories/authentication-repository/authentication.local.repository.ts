import { ref, Ref } from 'vue';
import { injectable } from 'inversify';
import IAuthenticationLocalRepository from '../../../business/plugins/authentication.local.repository.plugin';
import Registration from '../../../business/entities/registration';
import Login from '../../../business/entities/login';

@injectable()
export default class AuthenticationLocalRepository implements IAuthenticationLocalRepository {

    private _registration = ref<Registration | null>(Registration.create());
    private _login = ref<Login | null>(Login.create());

    public getRegistration(): Ref<Registration | null> {
        return this._registration;
    }

    public storeRegistration(registration: Registration): void {
        this._registration.value = registration;
    }

    public getLogin(): Ref<Login | null> {
        return this._login;
    }

    public storeLogin(login: Login): void {
        this._login.value = login;
    }
}
