import { Card, CardGroup, Form, Grid, GridColumn, GridRow, Header, Segment, Statistic, StatisticGroup, StatisticLabel, StatisticValue } from "semantic-ui-react";

export default function GameRule() {


    return (
        <>
            <Segment clearing inverted>
                <Grid celled>
                    <GridRow centered>
                        <Header as='h1' textAlign='center' inverted style={{color:'white'}}>
                            @GameName <Header.Subheader > by @AuthorName</Header.Subheader>
                        </Header>
                    </GridRow>
                    <GridRow columns={2}>
                        <GridColumn width={10}>
                            <GridRow>
                                <Header as='h3' textAlign='center' style={{ color: 'white' }} >Number Range</Header>
                                <StatisticGroup style={{'justify-content':'center'}} size='mini' inverted>
                                <Statistic floated='right'>
                                    <StatisticLabel>Min Number</StatisticLabel>
                                    <StatisticValue>8</StatisticValue>
                                </Statistic>
                                <Statistic floated = 'left'>
                                    <StatisticLabel>Max Number</StatisticLabel>
                                    <StatisticValue>10</StatisticValue>
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
                                <Card style={{ 'box-shadow': '4px 2px 0px 4px' }}  >
                                    <Card.Content textAlign='center'>
                                        <Header as='h4'> 7 </Header>
                                        <Card.Description> Foo</Card.Description>

                                    </Card.Content>
                                </Card>
                                <Card color='black'>
                                    <Card.Content textAlign='center'>
                                        <Header as='h5'> 8 </Header>
                                        <Card.Description> Foo</Card.Description>

                                    </Card.Content>
                                </Card>
                                <Card  color='black'>
                                    <Card.Content textAlign='center'>
                                        <Header as='h5'> 9 </Header>
                                        <Card.Description> Foo</Card.Description>

                                    </Card.Content>
                                </Card>


                            </CardGroup>

                        </GridColumn>

                        <GridColumn width={6}>

                            <Form autoComplete='off' className='ui inverted form'>
                                <Form.Input label="Player's Name: " placeholder='Name' name='playerName' />
                                <Form.Input label='Duration: ' type='number' name='duration'/>


                            </Form>
                           
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Segment>
        </>


    );
}