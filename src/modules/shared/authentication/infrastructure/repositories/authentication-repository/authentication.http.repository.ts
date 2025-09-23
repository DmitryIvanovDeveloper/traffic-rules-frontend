import Result from '@/infrastructure/helpers/result';
import { inject, injectable } from 'inversify';
import IAuthenticationHttpRepository from '../../../business/plugins/authentication.http.repository.plugin';
import SignUpRequest from './dtos/sign-up.request';
import IRegistrationResponse from './dtos/registration-response';
import IHttpClient from '@/infrastructure//api/http/http.interface';
import Mapper from './dtos/mapper';
import ILoginResponse from './dtos/login.response';
import ILoginRequest from './dtos/login.request';
import { TYPES } from '@/infrastructure/bootstrap/types';
import { NetworkError } from '@/infrastructure//errors/network.error';
import AuthenticationError from '../../../business/errors/authentication.error';
import RegistrationRequestDTO from '../../../business/dtos/registration.dto';

@injectable()
export default class AuthenticationHttpRepository implements IAuthenticationHttpRepository {

    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient,
    ){} 

    public signUp = async (signupDto: RegistrationRequestDTO): Promise<Result<string>> => {
        const endpoint = 'admin/sign_up/';
        const request = new SignUpRequest(signupDto);

        const response = await this._httpClient.post<IRegistrationResponse, SignUpRequest>(endpoint, request);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as AuthenticationError);
        }

        return Result.success(response.data.token);
    };

    public signIn = async (email: string, password: string): Promise<Result<string>> => {
        const endpoint = 'sign_in/';

        const request: ILoginRequest = {
            user: {
                email,
                password,
            }
        };

        const response = await this._httpClient.post<ILoginResponse, ILoginRequest>(endpoint, request);

        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as AuthenticationError);
        }

        return Result.success(response.data.token);
    };


    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
        return Result.failure();
    }
}
