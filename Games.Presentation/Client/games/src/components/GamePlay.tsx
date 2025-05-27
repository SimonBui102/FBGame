import { Card, CardGroup, Header } from "semantic-ui-react";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import { useState } from "react";
import GamePlayLayOut from "./GamePlayLayout";

export default function GamePlay() {


    const [gameDefinition, setGameDefinition] = useState<GameDefinitionDto>({

        id: undefined,
        authorName: 'AuthorName',
        gameName: 'GameName',
        minNumber: 0,
        maxNumber: 10,
        createDate: undefined,
        rules: []


    });


    const left = (
        <CardGroup itemsPerRow="3" centered>

         

                <Card style={{ 'boxShadow': '4px 2px 0px 4px' }}  >
                    <Card.Content textAlign='center'>
                        <Header as='h4'> 9 </Header>
                        <Card.Description> Foo</Card.Description>

                    </Card.Content>
                </Card>

 







        </CardGroup>
    )

    const right = (
        <>
            <p style={{ margin: '3px' }}>Player Name: Thit Bo</p>
            <p style={{ margin: '3px' }}>Player Name: Thit Bo</p>
            <p style={{ margin: '3px' }}>Player Name: Thit Bo</p>
            <p style={{ margin: '3px' }}>Player Name: Thit Bo</p>
            <p style={{ margin: '3px' }}>Player Name: Thit Bo</p>
           
            
        </>

    
    )





    return (
        <>
            <GamePlayLayOut
                pageTitle='Player Information'
                gameName={gameDefinition.gameName}
                authorName={gameDefinition.authorName}
                minNumber={gameDefinition.minNumber}
                maxNumber={gameDefinition.maxNumber}
                leftChild={left}
                rightChild={right}

            >
            </GamePlayLayOut>

        </>
    
    );
}