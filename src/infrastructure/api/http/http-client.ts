import { inject } from 'inversify';
import { NetworkError } from '../../errors/network.error';
import Result from '@/infrastructure/helpers/result';
import IErrorResponse from '../../dtos/errorResponse';
import IHttpClient from './http.interface';
import { TYPES } from '../../bootstrap/types';
import AuthTokenUseCases from '@/modules/shared/authStorage/business/usecases/auth-token.usecases';
import router from '@/app/router/router';
import { RouterPaths } from '@/app/router/router-paths';

export default class HttpClient implements IHttpClient {
    private _baseUrl: string;

    constructor(
        @inject(TYPES.AuthTokenUseCases)
        private readonly _authTokenUseCases: AuthTokenUseCases,
    ) {
        this._baseUrl = import.meta.env.VITE_ENDPOINT_API;
    }

    async request<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        payload?: TRequest,
    ): Promise<Result<TResponse>> {
        
        const isFormData = payload instanceof FormData;

        const headers: Record<string, string> = {
            Accept: 'application/json',
            Origin: 'http://localhost:5174',
        };

        const result = this._authTokenUseCases.get();
        const token = result.data;
       
        
        if (token) {
            headers['Authorization'] = `Token ${result.data}`;
        }

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }


        try {
            const response = await fetch(`${this._baseUrl}${endpoint}`, {
                method,
                headers,
                body: payload
                    ? isFormData
                        ? (payload as FormData)
                        : JSON.stringify(payload)
                    : undefined,
            });


            if (response.status === 401) {
               router.push(RouterPaths.login);
               this._authTokenUseCases.clear();
            }

            if (response.ok) {
                const json = (await response.json()) as TResponse;
                return Result.success(json);
            }

            if (response.status === 404) {
                try {
                    const json = await response.json();
                    return Result.success(json as TResponse);
                } catch {
                    return Result.failure(new NetworkError(response.statusText, 'Not Found'));
                }
            }

            try {
                const json = await response.json();
                return Result.failure(new NetworkError(response.statusText, response.status.toString(), json as IErrorResponse));
            } catch {
                return Result.failure(new NetworkError(response.statusText, response.status.toString()));
            }

        } catch (error) {
            return Result.failure(new NetworkError('Network error', 'NETWORK_ERROR'));
        }
    }

    public get<TResponse>(endpoint: string): Promise<Result<TResponse>> {
        return this.request<TResponse, undefined>(endpoint, 'GET');
    }

    public post<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest
    ): Promise<Result<TResponse>> {
        return this.request<TResponse, TRequest>(endpoint, 'POST', payload);
    }

    public put<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest
    ): Promise<Result<TResponse>> {
        return this.request<TResponse, TRequest>(endpoint, 'PUT', payload);
    }

    public delete<TResponse>(endpoint: string): Promise<Result<TResponse>> {
        return this.request<TResponse, undefined>(endpoint, 'DELETE');
    }
}
