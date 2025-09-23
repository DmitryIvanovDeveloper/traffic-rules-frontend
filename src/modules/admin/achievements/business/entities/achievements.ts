import { CreateAchievementRequestDTO, CreateAchievementResponseDTO } from "../dtos/create-achievements.dto";
import { LoadAchievementsResponseDTO } from "../dtos/load-achievements.dto";
import { v4 as uuidv4 } from 'uuid';

export interface AchievementProps {
    readonly id: string;
    readonly name: string;
    readonly correctAnswersInRow: number;
    readonly timeCompleted: number;
    readonly stars: number;
    readonly earnedMoney: number;
    readonly lang: string;
    readonly projectId: string;
    readonly description: string;
    readonly published: boolean;
    readonly levelsId: ReadonlyArray<string>;
    readonly edited?: boolean;
    readonly questionsId: ReadonlyArray<string>,
    readonly availableLevels: ReadonlyArray<{id: string, name: string}>
    readonly availableQuestions: ReadonlyArray<{id: string, name: string}>
    readonly deleting?: boolean;

}

export default class Achievement {
    constructor(
        public readonly id: string = uuidv4(),
        public readonly name: string,
        public readonly correctAnswersInRow: number,
        public readonly timeCompleted: number,
        public readonly stars: number,
        public readonly earnedMoney: number,
        public readonly lang: string,
        public readonly projectId: string,
        public readonly description: string,
        public readonly published: boolean,
        public readonly levelsId: ReadonlyArray<string> = [],
        public readonly questionsId: ReadonlyArray<string> = [],
        public readonly availableLevels: ReadonlyArray<{id: string, name: string}> = [],
        public readonly availableQuestions: ReadonlyArray<{id: string, name: string}> = [],
        public readonly edited?: boolean,
        public readonly deleting?: boolean,
    ) {}

    public updatedWithName(name: string): this {
        return this.cloneWith({ name });
    }

    public updatedWithCorrectAnswersInRow(correctAnswersInRow: number): this {
        if (correctAnswersInRow < 0) {
            return this;
        }

        return this.cloneWith({ correctAnswersInRow });
    }

    public updatedWithStars(stars: number): this {
        return this.cloneWith({ stars });
    }

    public updatedWithEarnedMoney(earnedMoney: number): this {
        return this.cloneWith({ earnedMoney });
    }

    public updatedWithDescription(description: string): this {
        return this.cloneWith({ description });
    }

    public updatedWithPublished(published: boolean): this {
        return this.cloneWith({ published });
    }

    public updatedWithLevelId(levelId: string): this {
        const includes = this.levelsId.includes(levelId) 

        const updatedLevelsId = includes
            ? this.levelsId.filter(id => id !== levelId) 
            : [...this.levelsId, levelId]
        ;

        const filteredAvailableQeustions = this.availableQuestions.
            filter(question => !updatedLevelsId.includes(question.id))
        ;

        const updated = this.cloneWith({ levelsId: updatedLevelsId })

        return includes 
            ? updated
            : updated.cloneWith({ availableQuestions: filteredAvailableQeustions })
        ;
    }

    public updatedWithAvailableLevels(availableLevels: ReadonlyArray<{id: string, name: string}>): this {
        return this.cloneWith({ availableLevels });
    }

    public updatedWithAvailableQuestions(availableQuestions: ReadonlyArray<{id: string, name: string}>): this {
        const filteredAvailableQeustiions = availableQuestions.filter(question => !this.levelsId.includes(question.id))

        return this.cloneWith({ availableQuestions: filteredAvailableQeustiions });
    }

    public updatedWithQuestionsId(questonId: string): this {
        const updatedQuestionsId = this.questionsId.includes(questonId) 
            ? this.questionsId.filter(id => id !== questonId) 
            : [...this.questionsId, questonId]
        ;

        return this.cloneWith({ levelsId: updatedQuestionsId });
    }

    public updatedWithDeleting(deleting: boolean): this {
        return this.cloneWith({ deleting });
    }

    public cloneWith(params: Partial<AchievementProps>): this {
        return new Achievement(
            this.id,
            params.name ?? this.name,
            params.correctAnswersInRow ?? this.correctAnswersInRow,
            params.timeCompleted ?? this.timeCompleted,
            params.stars ?? this.stars,
            params.earnedMoney ?? this.earnedMoney,
            params.lang ?? this.lang,
            params.projectId ?? this.projectId,
            params.description ?? this.description,
            params.published ?? this.published,
            params.levelsId ?? this.levelsId,
            params.questionsId ?? this.questionsId,
            params.availableLevels ?? this.availableLevels,
            params.availableQuestions ?? this.availableQuestions,
            params.edited ?? this.edited,
            params.deleting ?? this.deleting
        ) as this;
    }

    static toEntity(dto: LoadAchievementsResponseDTO | CreateAchievementResponseDTO): Achievement {
        return new Achievement(
            dto.id,
            dto.text,
            dto.correctAnswersInRow,
            dto.timeCompleted,
            dto.stars,
            dto.earnedMoney,
            dto.lang,
            dto.projectId,
            dto.description,
            dto.published,
            dto.levelsId,
            dto.questionsId,
        );
    }

    static toCreateRequest(projectId: string): CreateAchievementRequestDTO {
        return {
            text: 'Новое достижение',
            lang: "RU",
            projectId,
            correctAnswersInRaw: 0,
            timeCompleted: 0,
            stars: 0,
            earnedMoney: 0,
            description: '',
            published: false,
            levelsId: [],
            questionsId: []
        };
    }
}
