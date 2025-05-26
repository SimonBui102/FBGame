import {  useParams } from "react-router-dom";
import { Button, Card, CardGroup, Form, Grid, GridColumn, GridRow, Header, Segment, Statistic, StatisticGroup, StatisticLabel, StatisticValue } from "semantic-ui-react";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import { useEffect, useState } from "react";
import apiConnector from "../api/apiConnector";

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

    useEffect(() => {
        if (id) { apiConnector.getGameDefinitionById(id).then(gameDefinition => setGameDefinition(gameDefinition!)); }



    }, [id]);

    return (
        <>
            <Segment clearing inverted>
                <Grid celled>
                    <GridRow centered>
                        <Header as='h1' textAlign='center' inverted style={{ color: 'white' }}>
                            {gameDefinition.gameName} <Header.Subheader > by {gameDefinition.authorName}</Header.Subheader>
                        </Header>
                    </GridRow>
                    <GridRow columns={2}>
                        <GridColumn width={10}>
                            <GridRow>
                                <Header as='h3' textAlign='center' style={{ color: 'white' }} >Number Range</Header>
                                <StatisticGroup style={{ 'justifyContent': 'center', 'gap': '40px' }} size='mini' inverted>
                                    <Statistic floated='right'>
                                        <StatisticLabel>Min Number</StatisticLabel>
                                        <StatisticValue>{gameDefinition.minNumber}</StatisticValue>
                                    </Statistic>
                                    <Statistic floated='left'>
                                        <StatisticLabel>Max Number</StatisticLabel>
                                        <StatisticValue>{gameDefinition.maxNumber}</StatisticValue>
                                    </Statistic>
                                </StatisticGroup>
                            </GridRow>

                        </GridColumn>

                        <GridColumn width={6}>
                            <Header as='h3' textAlign='center' style={{ color: 'white' }} >Setup Area</Header>
                        </GridColumn>
                    </GridRow>

                    <GridRow columns={2}>
                        <GridColumn width={10}>
                            <Header as='h3' textAlign='center' style={{ color: 'white' }} >Rules</Header>
                            <CardGroup itemsPerRow="3" centered>

                                {gameDefinition.rules.map((r,index) => (

                                    <Card key={index} style={{ 'boxShadow': '4px 2px 0px 4px' }}  >
                                        <Card.Content textAlign='center'>
                                            <Header as='h4'> {r.divisor} </Header>
                                            <Card.Description> {r.word}</Card.Description>

                                        </Card.Content>
                                    </Card>

                                ))}
                                

 
     



                            </CardGroup>

                        </GridColumn>

                        <GridColumn  width={6}>

                            <Form autoComplete='off' className='ui inverted form'>
                                <Form.Input label="Player's Name: " placeholder='Name' name='playerName' />
                                <Form.Input label='Duration (s): ' type='number' name='duration' />
                                <Button floated='right' positive type='submit' content='Submit'></Button>


                            </Form>

                        </GridColumn>
                    </GridRow>
                </Grid>
            </Segment>
        </>


    );
}