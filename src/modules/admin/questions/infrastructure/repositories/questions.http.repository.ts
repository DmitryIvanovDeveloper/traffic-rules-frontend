import {
    LoadQuestionResponse,
    LoadQuestionsRequest,
} from "../../business/dtos/load-question.dto";
import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { NetworkError } from "@/infrastructure/errors/network.error";
import IQuestionsHttpRepository from "../../business/plugins/questions.http.repository.plugin";
import GetQuestionsResponse from "./dtos/get-questions.response";
import {
    CreateQuestionRequest,
    CreateQuestionResponse,
} from "../../business/dtos/create-question.dto";
import {
    mapPostQuestionsResponseToDto,
    mapQuestionsResponseToDto,
} from "./dtos/mapper";
import PostQuestionResponse, {
    PostQuestionRequest,
} from "./dtos/post-questions.request";
import {
    UpdateQuestionRequestDTO,
    UpdateQuestionResponseDTO,
} from "../../business/dtos/update-question.dto";
import {
    PutQuestionRequest,
    PutQuestionResponse,
} from "./dtos/put-questions.request";
import { DeleteQuestionResponse } from "./dtos/delete-question";

export default class QuestionsHttpRepository
    implements IQuestionsHttpRepository {
    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient
    ) { }

    public loadQuestions = async (
        loadQuestionsRequest: LoadQuestionsRequest
    ): Promise<Result<Array<LoadQuestionResponse>>> => {
        const endpoint = `cards/admin/questions/?level_id=${loadQuestionsRequest.levelId}`;

        const response =
            await this._httpClient.get<Array<GetQuestionsResponse>>(endpoint);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError);
        }

        const dto = response.data.map(mapQuestionsResponseToDto);

        return Result.success(dto);
    };

    public save = async (
        createQuestionRequest: CreateQuestionRequest
    ): Promise<Result<CreateQuestionResponse>> => {
        const endpoint = `cards/admin/questions/`;

        const request = new PostQuestionRequest(createQuestionRequest);

        const response = await this._httpClient.post<PostQuestionResponse, PostQuestionRequest>(endpoint, request);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError);
        }

        const dto = mapPostQuestionsResponseToDto(response.data);
        return Result.success(dto);
    };

    public update = async (
        questionId: string, 
        updateQuestionRequest: UpdateQuestionRequestDTO
    ): Promise<Result<UpdateQuestionResponseDTO>> => {
        
        const endpoint = `cards/admin/questions/${questionId}/`;

        const request = new PutQuestionRequest(updateQuestionRequest);
        console.log(request)

        const response = await this._httpClient.put<PutQuestionResponse, PutQuestionRequest>(endpoint, request);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError);
        }

        return Result.success(new UpdateQuestionResponseDTO(response.data));
    };


    public delete = async (questionId: string): Promise<Result<void>> => {
        const endpoint = `cards/admin/questions/${questionId}/`;

        const response = await this._httpClient.delete<DeleteQuestionResponse>(endpoint);
        if (!response.isSuccess) {
            return this.handleNetworkError(response.errors as NetworkError);
        }

        return Result.success();
    };

    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
        return Result.failure();
    }
}
