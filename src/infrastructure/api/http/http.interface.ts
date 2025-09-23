import Result from "@/infrastructure/helpers/result";

export default interface IHttpClient {
    get<TResponse>(endpoint: string): Promise<Result<TResponse>>;

    post<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest
    ): Promise<Result<TResponse>>;

    put<TResponse, TRequest extends Record<string, any> | FormData | undefined>(
        endpoint: string,
        payload: TRequest
    ): Promise<Result<TResponse>>;

    delete<TResponse>(endpoint: string): Promise<Result<TResponse>>;
}