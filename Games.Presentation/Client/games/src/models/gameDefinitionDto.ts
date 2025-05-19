import type { GameRuleDto } from "./gameRuleDto";

export interface GameDefinitionDto {

    id: number | undefined,
    authorName: string,
    gameName: string,
    minNumber: number,
    maxNumber: number,
    createDate: string | undefined,
    rules: GameRuleDto[],
}