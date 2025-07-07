import {render, screen} from '@testing-library/react';
import type { GameDefinitionDto } from "../../src/models/gameDefinitionDto";
import GameTableItem from "../../src/components/GameTableItem";
import { MemoryRouter } from "react-router-dom";

describe('GameTableItem', () => {
    
    it('should render game definition details and a play button', () => {

        var newGameDefinition:GameDefinitionDto={id:1, 
            authorName:"Testing",
            gameName:"GameName Testing",
            minNumber:0,
            maxNumber: 100,
            createDate:"10-10-2024",
            rules:[] };

        render(<MemoryRouter>
         <table><tbody><GameTableItem gameDefinition={newGameDefinition}  /></tbody></table>
        </MemoryRouter>);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Testing')).toBeInTheDocument();
        expect(screen.getByText('GameName Testing')).toBeInTheDocument();
        expect(screen.getByText('10-10-2024')).toBeInTheDocument();

        const playButton = screen.getByRole('button',{name:/play/i});
        expect(playButton).toBeInTheDocument();
        expect(playButton.closest('a')).toHaveAttribute('href','/gameRule/1');
        

        
        
    })
})