import {render, screen, waitFor} from '@testing-library/react';
import { MemoryRouter, useNavigate } from "react-router-dom";

import GameRule from "../../src/components/GameRule";
import type { GameDefinitionDto } from "../../src/models/gameDefinitionDto";
import type { CreateGameSessionDto } from "../../src/models/createGameSessionDto";
import apiConnector from "../../src/api/apiConnector";
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async() => {

    const actual = await vi.importActual('react-router-dom') as{};

    return{
        ...actual,
        useParams: () =>({id:'1'}),
        useNavigate: () =>mockNavigate,

    }


})


describe('Game Rule', () => {

   const mockGameDefinition:GameDefinitionDto={
        id:1,
        authorName:"Simon",
        gameName:"FizzBuzz",
        minNumber:10,
        maxNumber:100,
        createDate:"2025-02-10",
        rules:[{divisor:3,word:"Fizz"},{divisor:5, word:"Buzz"}]



   };

   const mockSession:CreateGameSessionDto = {
        gameSessionId:1,
        playerName:'Danny',
        startTime:"6:30",
        endTime:"6:35",
        nextRandomNumber:36

   }

   beforeEach(()=>{
        vi.spyOn(apiConnector,'getGameDefinitionById').mockImplementation(() => Promise.resolve(mockGameDefinition));
        vi.spyOn(apiConnector,'createGameSession').mockImplementation(() => Promise.resolve(mockSession) );
        mockNavigate.mockReset();

   });

   it('renders game definition and rules from API', async() => {

        render(<MemoryRouter><GameRule/></MemoryRouter>);

        await waitFor(() =>{
            expect(screen.getByText(/FizzBuzz/i)).toBeInTheDocument();
            expect(screen.getByText(/by simon/i)).toBeInTheDocument();
            expect(screen.getByText("10")).toBeInTheDocument();
            expect(screen.getByText("100")).toBeInTheDocument();

        });

        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText("Fizz")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("Buzz")).toBeInTheDocument();

        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
        expect(screen.getByRole('button',{name: /submit/i})).toBeInTheDocument();


    
   })

   it('submits game setup and navigates to session page', async() => {

        render(<MemoryRouter><GameRule/></MemoryRouter>);

        await waitFor(() => screen.getByText("Fizz"));

        const nameInput = screen.getByPlaceholderText("Name");
        const durationInput = screen.getByLabelText(/duration/i);
        const submitButton = screen.getByRole('button',{name:/submit/i});

        const user= userEvent.setup();

        await user.type(nameInput,"Danny");
        await user.clear(durationInput);
        await user.type(durationInput,'300');
        await user.click(submitButton);

        await waitFor(() =>{
            expect(apiConnector.createGameSession).toHaveBeenCalledWith({playerName:'Danny', duration:300},'1')

            expect(mockNavigate).toHaveBeenCalledWith('/gamesessions/1',{
                state:{
                    gameDefinitionState: mockGameDefinition,
                    createGameSessionState: mockSession


                }

            });
        });
   });
    
});
