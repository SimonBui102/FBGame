import type { AxiosResponse } from "axios";
import axios from "axios";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import type  { GetGamesDefinitionResponse } from "../models/getGamesDefinitionResponse";
import { API_BASE_URL } from "../../config.ts";
import type { GetGameDefinitionByIdResponse } from "../models/getGameDefinitionByIdResponse.ts";
import type { CreateGameSessionDto } from "../models/createGameSessionDto.ts";
import type { GameSetupDto } from "../models/gameSetupDto.ts";
import type { CreateGameSessionResponse } from "../models/createGameSessionResponse.ts";
import type { PlayerAnswerSubmissionDto } from "../models/playerAnswerSubmissionDto.ts";
import type { SubmitGameSessionAnswerDto } from "../models/SubmitGameSessionAnswerDto.ts";
import type { SubmitGameSessionAnswerResponse } from "../models/SubmitGameSessionAnswerResonse.ts";

const apiConnector = {

    getGamesDefinition: async (): Promise<GameDefinitionDto[]> => {
        try {
            const response: AxiosResponse<GetGamesDefinitionResponse> = await axios.get(`${API_BASE_URL}/games`);
            const gamesDefinition = response.data.gameDefinitionDtos.map(game => ({
                ...game,
                createDate: game.createDate?.slice(0, 10) ?? ""

            }));
            return gamesDefinition;

        } catch (error) {

            console.log("Error fetching movie:", error);
            throw error;
        }

    },

    createGameDefinition: async (gameDefinition: GameDefinitionDto): Promise<void> => {

        try {
            await axios.post<number>(`${API_BASE_URL}/games`, gameDefinition);


        } catch (error) {
            console.log(error);
            throw error;

        }


    },

    createGameSession: async (gameSetup: GameSetupDto, gameDefinitionId: string): Promise<CreateGameSessionDto> => {

        try {

            const response = await axios.post<CreateGameSessionResponse>(`${API_BASE_URL}/gamesessions/${gameDefinitionId}`, gameSetup);
            console.log(response.data.createGameSessionDto);
            return response.data.createGameSessionDto;
            

        } catch (error) {

            console.log(error);
            throw (error);


        }


    },


    submitGameSession: async (playerSubmission: PlayerAnswerSubmissionDto, gameSessionId: string): Promise<SubmitGameSessionAnswerDto> => {

        try {
            const response = await axios.post<SubmitGameSessionAnswerResponse>(`${API_BASE_URL}/gamesessions/${gameSessionId}/guesses`, playerSubmission);
            return response.data.submitGameSessionAnswerDto;
        } catch (error) {
            console.log(error);
            throw (error);

        }
        


    },

    getGameDefinitionById: async (gameDefinitionId: string): Promise<GameDefinitionDto | undefined> => {

        try {

            const response = await axios.get<GetGameDefinitionByIdResponse>(`${API_BASE_URL}/games/${gameDefinitionId}`);
            return response.data.gameDefinitionDto;

        } catch (error) {
            console.log(error);
            throw error;

        }

    }





}

export default apiConnector;