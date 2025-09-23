export interface IBaseUseCase<TInput, TResult> {
    execute(input: TInput): Promise<TResult>;
}

export abstract class BaseUseCase<TInput, TResult> implements IBaseUseCase<TInput, TResult> {
    abstract execute(input: TInput): Promise<TResult>;
}