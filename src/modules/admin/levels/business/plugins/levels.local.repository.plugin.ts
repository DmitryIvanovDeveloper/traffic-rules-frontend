import Result from "@/infrastructure/helpers/result";
import Level from "../entities/level";
import { Ref } from "vue";

export default interface ILevelsLocalRepository {
    clearLevel(): void;
    clear(): void;
    storeLevel(level: Level): void;
    addLevel(level: Level): void;
    updateLevel(updatedLevel: Level): void;
    storeLevels(levels: Array<Level>): void;
    findLevelById(id: string): Result<Level>;
    getLevel(): Ref<Level | undefined> 
    getLevels(): Ref<Array<Level> | undefined>;
}