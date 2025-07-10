import {render, screen,waitFor} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import GameForm from "../../src/components/GameForm";
import apiConnector from "../../src/api/apiConnector";


const mockNavigate =vi.fn();

    vi.mock('react-router-dom', async() => {
        const actual = await vi.importActual('react-router-dom')as{}

        return{
            ...actual,
            useNavigate: () => mockNavigate,

        };


    })

describe('GameForm', () => {

    

    beforeEach(() =>{
        vi.spyOn(apiConnector,"createGameDefinition").mockImplementation(() => Promise.resolve());
        mockNavigate.mockReset();

    }) ;

    
    it('renders form inputs and buttons', () => {

        render(<MemoryRouter><GameForm/> </MemoryRouter>);


        expect(screen.getByPlaceholderText(/Author Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Game Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Min Number/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Max Number/i)).toBeInTheDocument();

        expect(screen.getByRole("button",{name:/submit/i})).toBeInTheDocument();
        expect(screen.getByRole("button",{name:/Add Rule/i})).toBeInTheDocument();
        expect(screen.getByRole("button",{name:/Cancel/i})).toBeInTheDocument();
        
    })

    it('Updates Form state when user types', async () => {

        render(<MemoryRouter> <GameForm/> </MemoryRouter>);

        const authorNameInput = screen.getByPlaceholderText(/Author Name/i);
        const gameNameInput = screen.getByPlaceholderText(/Game Name/i);
        const minNumberInput =screen.getByPlaceholderText(/Min Number/i);
        const maxNumberInput = screen. getByPlaceholderText(/Max Number/i);

        const user = userEvent.setup();

        await user.type(authorNameInput,"Simon");
        await user.type(gameNameInput,"Fizz");
        await user.type(minNumberInput,"50");
        await user.type(maxNumberInput,"{backspace}90", {initialSelectionStart:0, initialSelectionEnd:3});

        expect(authorNameInput).toHaveValue("Simon");
        expect(gameNameInput).toHaveValue("Fizz");
        expect(minNumberInput).toHaveValue(50);
        expect(maxNumberInput).toHaveValue(90);

        
    })


    it('Adds and Removes rules', async() => {

        render(<MemoryRouter><GameForm/></MemoryRouter>)

        const addRuleButton= screen.getByRole("button",{name:/Add rule/i});
        const user = userEvent.setup();

        await user.click(addRuleButton);

        const divisorInput = screen.getByPlaceholderText("Divisor");
        const wordInput = screen.getByPlaceholderText("Word");

        expect(divisorInput).toBeInTheDocument();
        expect(wordInput).toBeInTheDocument();

        await user.type(divisorInput,"5",{initialSelectionStart:0,initialSelectionEnd:1});
        await user.type(wordInput, "buzz", {initialSelectionStart:0, initialSelectionEnd:7});

        expect(divisorInput).toHaveValue(5);
        expect(wordInput).toHaveValue("buzz");

        const deleteButton= screen.getByRole("button",{name:/delete/i});

        await user.click(deleteButton);

        expect(divisorInput).not.toBeInTheDocument();
        expect(wordInput).not.toBeInTheDocument();

        
    })

    it('submits the form and navigate homes', async() => {
        
        render(<MemoryRouter><GameForm/></MemoryRouter>)

        const authorNameInput = screen.getByPlaceholderText(/Author Name/i);
        const submitButton = screen.getByRole("button",{name:/submit/i});
        const user= userEvent.setup();
        await user.type(authorNameInput,"AuthorNameTesting");
        await user.click(submitButton);

        expect(apiConnector.createGameDefinition).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/');

    })


})