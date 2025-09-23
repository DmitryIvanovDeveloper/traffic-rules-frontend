import Result from "@/infrastructure/helpers/result";
import Level from "../../business/entities/level";
import ILevelsLocalRepository from "../../business/plugins/levels.local.repository.plugin";
import { ref, Ref } from "vue";
import LevelNotFoundError from "../../business/errors/level-not-found.error";

export default class LevelsLocalRepository implements ILevelsLocalRepository  {
    private _levels = ref<Array<Level> | undefined>(undefined);
    private _level = ref<Level>();

    public storeLevels(levels: Array<Level>): void {
        this._levels.value = levels;
    }

    public addLevel(level: Level): void {
        if (!this._levels.value) {
            return;
        }
        
        this._levels.value.push(level);
    }

    public updateLevel(updatedLevel: Level): void {
        if (!this._levels.value) {
            return;
        }

        const index = this._levels.value.findIndex((question) => question.id === updatedLevel.id);
        if (index === -1) {
            return;
        }

        this._levels.value[index] = updatedLevel;
        if (this._level.value?.id !== updatedLevel.id) {
            return;
        }

        this._level.value = updatedLevel;
     }

    public storeLevel(level: Level): void {
        this._level.value = level;
    }

    public getLevels(): Ref<Array<Level> | undefined> {
        return this._levels;
    }

    public getLevel(): Ref<Level | undefined> {
        return this._level;
    }

    public findLevelById(id: string): Result<Level> {
        const expectedLevel = this._levels.value?.find(level => level.id === id);
        if (!expectedLevel) {
            return Result.failure(new LevelNotFoundError(id))
        }

        return Result.success(expectedLevel);
    }

    public clear(): void {
       this._levels.value = undefined
       this.clearLevel();
    }

    public clearLevel(): void {
        this._level.value = undefined;
     }
}