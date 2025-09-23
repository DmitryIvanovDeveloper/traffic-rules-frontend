export default interface IQuetionsService {
    findQuestionsIdByLevelId(id: string): Promise<ReadonlyArray<string>>;
} 