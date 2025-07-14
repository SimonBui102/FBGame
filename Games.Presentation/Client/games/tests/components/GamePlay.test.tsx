import {render, screen, waitFor, } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import GamePlay from "../../src/components/GamePlay";
import type { SubmitGameSessionAnswerDto } from "../../src/models/submitGameSessionAnswerDto";
import apiConnector from "../../src/api/apiConnector";
import userEvent from '@testing-library/user-event';



const mockLocationState = {

    gameDefinitionState:{
        id:1,
        gameName: "FizzBuzz",
        authorName: "Simon",
        minNumber:1,
        maxNumber:100,
        rules:[
            {divisor:3, word:"Fizz"},
            {divisor:5, word:"Buzz"}
        ],


    },

    createGameSessionState:{
        gameSessionId:1,
        playerName:"Danny",
        startTime: new Date(Date.now()).toISOString(),
        endTime: new Date(Date.now() + 60000*5).toISOString(),
        nextRandomNumber: 15,


    }

};

vi.mock('react-router-dom',async() => {

    const actual = await vi.importActual('react-router-dom') as{};

    return {
        ...actual,
        useLocation: () => ({state: mockLocationState}),

    }


});


describe('GamePlay', () => {

    const mockSubmitResponse: SubmitGameSessionAnswerDto = {
        isCorrect:true,
        correctAnswer:"FizzBuzz",
        nextRandomNumber:9,
        correct:1,
        incorrect:0

    };

    beforeEach(() => {

        vi.spyOn(apiConnector, "submitGameSession").mockResolvedValue(mockSubmitResponse);



    });

    it("render rule cards, player info, and random number", () => {

        render(<MemoryRouter><GamePlay/></MemoryRouter>);

        //Rule cards
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("Fizz")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("Buzz")).toBeInTheDocument();

        //Player Information
        expect(screen.getByText("Danny")).toBeInTheDocument();
        expect(screen.getByText("#1")).toBeInTheDocument();
        expect(screen.getByTestId('correct-count')).toHaveTextContent('0');

        //Random Number:
        expect(screen.getByText("Random Number")).toBeInTheDocument();
        expect(screen.getByText("15")).toBeInTheDocument();






    });
    
    
    it('submits answer and update display', async() => {

        render(<MemoryRouter><GamePlay/></MemoryRouter>)

        const answerInput = screen.getByPlaceholderText(/answer/i);
        const submitButton = screen.getByRole('button',{name:/submit/i});
        

        const user = userEvent.setup();

        await user.type(answerInput,'FizzBuzz');
        await user.click(submitButton);

        //wait for state update

        await waitFor(() => {
            
            expect(apiConnector.submitGameSession).toHaveBeenCalledWith({playerAnswer: "FizzBuzz", randomNumber:15},"1");
            expect(screen.getByText("9")).toBeInTheDocument();
            
            
            

        });

        expect(answerInput).toHaveValue('');
        expect(screen.getByTestId('correct-count')).toHaveTextContent('1');

        




    })


})