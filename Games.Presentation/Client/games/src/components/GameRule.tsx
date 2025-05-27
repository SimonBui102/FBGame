import { useParams } from "react-router-dom";
import { Button, Card, CardGroup, Form, Header } from "semantic-ui-react";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import { useEffect, useState, type ChangeEvent } from "react";
import apiConnector from "../api/apiConnector";
import GamePlayLayOut from "./GamePlayLayout";
import type { GameSetupDto } from "../models/gameSetupDto";

export default function GameRule() {

    const { id } = useParams();
    // const navigate = useNavigate();

    const [gameDefinition, setGameDefinition] = useState<GameDefinitionDto>({

        id: undefined,
        authorName: 'AuthorName',
        gameName: 'GameName',
        minNumber: 0,
        maxNumber: 10,
        createDate: undefined,
        rules: []


    });

    const [gameSetup, setGameSetup] = useState<GameSetupDto>({
        playerName: '',
        duration:0,

    });

    useEffect(() => {
        if (id) { apiConnector.getGameDefinitionById(id).then(gameDefinition => setGameDefinition(gameDefinition!)); }



    }, [id]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        setGameSetup((s) => ({ ...s, [name]: name == 'duration' ? Number(value) : value }));

    };

    const handleSubmit = () => { console.log (gameSetup)}
    const left = (
        <CardGroup itemsPerRow="3" centered>

            {gameDefinition.rules.map((r, index) => (

                <Card key={index} style={{ 'boxShadow': '4px 2px 0px 4px' }}  >
                    <Card.Content textAlign='center'>
                        <Header as='h4'> {r.divisor} </Header>
                        <Card.Description> {r.word}</Card.Description>

                    </Card.Content>
                </Card>

            ))}







        </CardGroup>

    );

    const right = (

        <Form onSubmit={handleSubmit} autoComplete='off' className='ui inverted form'>
            <Form.Input label="Player's Name: " placeholder='Name' name='playerName' value={ gameSetup.playerName} onChange={handleChange} />
            <Form.Input label='Duration (s): ' type='number' name='duration' value={gameSetup.duration.toString()} onChange={handleChange} />
            <Button floated='right' positive type='submit' content='Submit'></Button>


        </Form>
    
    );

    return (

        <GamePlayLayOut
            pageTitle='Setup Area'
            gameName={gameDefinition.gameName}
            authorName={gameDefinition.authorName}
            minNumber={gameDefinition.minNumber}
            maxNumber={gameDefinition.maxNumber}
            leftChild={left}
            rightChild={right}
        >

        </GamePlayLayOut>


    );
}