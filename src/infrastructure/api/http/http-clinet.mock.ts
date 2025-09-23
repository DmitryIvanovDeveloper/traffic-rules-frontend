import { NetworkError } from '@/infrastructure//errors/network.error';
import IHttpClient from '@/infrastructure//api/http/http.interface';
import { injectable } from 'inversify';
import Result from '@/infrastructure/helpers/result';
import IErrorResponse from '../../dtos/errorResponse';
import { IError } from '../../dtos/error-type';

const mockFiles = import.meta.glob<{ default: unknown }>('@/infrastructure/mocks/**/*.json', { eager: true });

@injectable()
export default class HttpClientMock implements IHttpClient {
    private mockResponses: Map<string, unknown> = new Map();
    public error: IError | undefined = undefined;

    public lastEndpointNumber = 1;

    private async loadMockResponse(endpoint: string): Promise<void> {
        const formattedEndpoint = this.getLastEndpointParts(endpoint);
        const fileName = !this.error ? `${formattedEndpoint}.json` : `${formattedEndpoint}.${this.error.code}${!this.error.type ? '' : `.${this.error.type}`}.json`;
        const mockEntry = Object.entries(mockFiles).find(([key]) => key.endsWith(`/${fileName}`));

        if (!mockEntry) {
            console.warn(`[MOCK] JSON для ${endpoint} по пути ${fileName} не найден`);
            return;
        }

        const [, module] = mockEntry;
        this.mockResponses.set(endpoint, module.default);
    }

    public async request<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        payload?: TRequest,
    ): Promise<Result<TResponse>> {
        const path = `${endpoint}${method.toLocaleLowerCase()}`;


        await this.loadMockResponse(path);
        if (!this.mockResponses.has(path)) {
            throw new Error(`[MOCK] No mock response found for ${path}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (!!this.error) {
            const response = this.mockResponses.get(path) as IErrorResponse;
            return Result.failure(new NetworkError('', '', response));
        }

        const response = this.mockResponses.get(path) as TResponse;

        return Result.success(response);
    }

    public get<TResponse>(endpoint: string): Promise<Result<TResponse>> {
        return this.request<TResponse, undefined>(`${endpoint}`, 'GET');
    }

    public post<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest,
    ): Promise<Result<TResponse>> {
        return this.request<TResponse, TRequest>(endpoint, 'POST', payload);
    }

    public put<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest,
    ): Promise<Result<TResponse>> {
        return this.request<TResponse, TRequest>(endpoint, 'PUT', payload);
    }

    public delete<TResponse>(endpoint: string): Promise<Result<TResponse>> {
        return this.request<TResponse, undefined>(endpoint, 'DELETE');
    }

    private getLastEndpointParts(endpoint: string): string {
        return endpoint.replace(/\/\.(get|post|put|delete)$/i, '.$1').replace('?', '');
    }
}
