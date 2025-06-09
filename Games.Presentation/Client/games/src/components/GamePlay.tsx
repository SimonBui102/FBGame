import { Button, Card, CardGroup, Container, Form, Grid, GridColumn, GridRow, Header, Segment } from "semantic-ui-react";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import { useEffect, useState, type ChangeEvent } from "react";
import GamePlayLayOut from "./GamePlayLayout";
import { useLocation } from "react-router-dom";
import type { PlayerInformation } from "../models/playerInformation";
import type { CreateGameSessionDto } from "../models/createGameSessionDto";
import type { PlayerAnswerSubmissionDto } from "../models/playerAnswerSubmissionDto";
import apiConnector from "../api/apiConnector";

interface LocationState {
    gameDefinitionState: GameDefinitionDto,
    createGameSessionState: CreateGameSessionDto,

}

export default function GamePlay() {

    const { state } = useLocation();
    const { gameDefinitionState, createGameSessionState } = state as LocationState;


    const initialTimeLeft = Math.max(
        0,
        Math.ceil(
            (new Date(createGameSessionState.endTime).getTime() - Date.now()) / 1000
        )
    );
        
    const [playerInfomation, setPlayerInformation] = useState<PlayerInformation>({
        playerName: createGameSessionState.playerName,
        session: createGameSessionState.gameSessionId,
        correct: 0,
        incorrect: 0,
        timeLeft: initialTimeLeft


    });

    const [playerAnswer, setPlayerAnswer] = useState<PlayerAnswerSubmissionDto>({
        playerAnswer: "",
        randomNumber: createGameSessionState.nextRandomNumber

    });



    const [randomNumber, setRandomNumber] = useState<number>(createGameSessionState.nextRandomNumber);



    useEffect(() => {

        if (playerInfomation.timeLeft == 0) return;

        const timerId = window.setInterval(() => {

            setPlayerInformation((p) => {

                if (p.timeLeft <= 1) {
                    clearInterval(timerId);
                    return { ...p, timeLeft: 0 };

                }

                return { ...p, timeLeft: p.timeLeft - 1 };


            })


        },1000);

        return () => clearInterval(timerId);
    }, []);

    const timeLeftDisplay = `${Math.floor(playerInfomation.timeLeft / 60)}:${(playerInfomation.timeLeft % 60).toString().padStart(2,'0')}`;


    const handleSubmit = async () => {

        const response = await apiConnector.submitGameSession(playerAnswer, (playerInfomation.session).toString());
        console.log(response);
        setPlayerAnswer({ playerAnswer: "", randomNumber: response.nextRandomNumber });
        setRandomNumber(response.nextRandomNumber);
        setPlayerInformation((p) => ({ ...p, correct: response.correct, incorrect: response.incorrect }));


    }



    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        setPlayerAnswer((p) => ({ ...p, [name]: value }));
    }



    const left = (
        <CardGroup itemsPerRow="3" centered>

            {gameDefinitionState.rules.map((r, index) => (

                <Card key={index} style={{ 'boxShadow': '4px 2px 0px 4px' }}  >
                    <Card.Content textAlign='center'>
                        <Header as='h4'> {r.divisor} </Header>
                        <Card.Description> {r.word}</Card.Description>

                    </Card.Content>
                </Card>

            ))}







        </CardGroup>
    )

    const right = (
        <>
 


            <Grid style={{'fontSize':'16px'}} columns={2}>
                <GridRow style={{ 'padding': '0px 0px' }} >
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }} width={5} >
                        <p>Player Name:</p>
                    </GridColumn>
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }}>
                        <p>{playerInfomation.playerName}</p>
                    </GridColumn>
                </GridRow>
                <GridRow style={{ 'padding': '0px 0px' }} >
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }} width={5} >
                        <p>Session:</p>
                    </GridColumn>
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }}>
                        <p>#{playerInfomation.session}</p>
                    </GridColumn>
                </GridRow>
                <GridRow style={{ 'padding': '0px 0px' }} >
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }} width={5} >
                        <p>Correct:</p>
                    </GridColumn>
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }}>
                        <p>{playerInfomation.correct}</p>
                    </GridColumn>
                </GridRow>
                <GridRow style={{ 'padding': '0px 0px' }} >
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }} width={5} >
                        <p>Incorrect:</p>
                    </GridColumn>
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }}>
                        <p>{playerInfomation.incorrect}</p>
                    </GridColumn>
                </GridRow>
                                <GridRow style={{ 'padding': '0px 0px' }} >
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }} width={5} >
                        <p>Time Left:</p>
                    </GridColumn>
                    <GridColumn style={{ 'padding': '5px 0px 0px 14px' }}>
                        <p>{timeLeftDisplay}</p>
                    </GridColumn>
                </GridRow>




            </Grid>
           
            
        </>

    
    )





    return (
        <>
            <GamePlayLayOut
                pageTitle='Player Information'
                gameName={gameDefinitionState.gameName}
                authorName={gameDefinitionState.authorName}
                minNumber={gameDefinitionState.minNumber}
                maxNumber={gameDefinitionState.maxNumber}
                leftChild={left}
                rightChild={right}

            >
            </GamePlayLayOut>


            <Segment inverted textAlign="center">
                <Container textAlign='center' >
                    <Header inverted as="h3"  >Random Number</Header>
                    <Header inverted as="h2" style={{ 'marginTop': '0px' }}>{randomNumber}</Header>
                    <Form onSubmit={handleSubmit} autoComplete='off' size='large' >
                        <Form.Input
                            onChange={handleChange}
                            type='text'
                            placeholder="Answer"
                            name='playerAnswer'
                            value={playerAnswer.playerAnswer}
                            style={{ width: '40%' }}
                            disabled={playerInfomation.timeLeft===0}
                        
                       
                    />
                    <Button
                        primary
                        disabled={playerInfomation.timeLeft === 0}
                        type='submit'
                    >
                        Submit
                    </Button>
                    </Form>

                </Container>
            </Segment>


        </>
    
    );
}