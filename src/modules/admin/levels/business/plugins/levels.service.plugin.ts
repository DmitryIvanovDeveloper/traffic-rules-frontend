import Result from "@/infrastructure/helpers/result";

export default interface ILevelsService {
    getSelectedLevelId(): Result<string>;
}