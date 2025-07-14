import {render, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import GamePlayLayout from "../../src/components/GamePlayLayout";
import apiConnector from "../../src/api/apiConnector";
import{Header} from "semantic-ui-react";

describe('GamePlayLayout', () => {

    it('should renderr initial state', () => {
        
        const ruleHeader = <Header as='h4'> rule1</Header>;
        const playerInformationHeader= <Header as= 'h3'> Player Information </Header>;

        render(<GamePlayLayout 
            pageTitle= "TestingLayout"
            gameName="Testing Game Name" 
            authorName ="Testing Author Name"
            minNumber= {2}
            maxNumber={60}
            leftChild={ruleHeader}
            rightChild = {playerInformationHeader}

        />);


        const rightHeader= screen.getByText(/TestingLayout/i);
        const gameNameHeader = screen.getByText(/Testing Game Name/i);
        const authorNameHeader = screen.getByText(/Testing Author Name/i);

        const minNumber= screen.getByText("2");
        const maxNumber= screen.getByText("60");

        expect(rightHeader).toBeInTheDocument();
        expect(gameNameHeader).toBeInTheDocument();
        expect(authorNameHeader).toBeInTheDocument();
        expect(minNumber).toBeInTheDocument();
        expect(maxNumber).toBeInTheDocument();

        expect(screen.getByText(/number range/i)).toBeInTheDocument();
        expect(screen.getByText(/rules/i)).toBeInTheDocument();

        expect(screen.getByRole('heading',{name:/rule1/i})).toBeInTheDocument();
        expect(screen.getByRole('heading',{name: /Player Information/i})).toBeInTheDocument();
            


    })
    
})