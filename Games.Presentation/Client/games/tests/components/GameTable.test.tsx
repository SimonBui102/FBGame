import {render, screen,waitFor} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import GameTable from "../../src/components/GameTable";
import type { GameDefinitionDto } from "../../src/models/gameDefinitionDto";
import apiConnector from "../../src/api/apiConnector";

describe('GameTable', () => {
    
    const mockGame: GameDefinitionDto[] = [
        {
            id:1,
            gameName:"FizzGame",
            authorName:"Alice",
            minNumber:1,
            maxNumber:100,
            createDate:'2024-06-01',
            rules:[],

        },

        {
            id:2,
            gameName:"BuzzGame",
            authorName:"Simon",
            minNumber:1,
            maxNumber:100,
            createDate:'2024-05-04',
            rules:[],

        }

    ]

    //Spy on the API call
    beforeEach(() => {
        vi.spyOn(apiConnector,'getGamesDefinition').mockImplementation(() => Promise.resolve(mockGame));


    })

    it('fetches and display game definitions', async() => {

        render(<MemoryRouter><GameTable/> </MemoryRouter>)

        // wait for data to load
        await waitFor(() => {
            expect(screen.getByText('FizzGame')).toBeInTheDocument();
            expect(screen.getByText('BuzzGame')).toBeInTheDocument();


        })

        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Simon')).toBeInTheDocument();

        
    })

    it('renders "Create Game Definition" button with correct link', () => {

        render(<MemoryRouter> <GameTable/> </MemoryRouter>)

        const createButton = screen.getByRole("button", {name: /create game definition/i});
        expect(createButton).toBeInTheDocument();
        expect(createButton.closest('a')).toHaveAttribute('href','/createGameDefinition');
        
    })


})