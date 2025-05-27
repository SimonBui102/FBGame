import type { ReactNode } from "react";
import { Grid, GridColumn, GridRow, Header, Segment, Statistic, StatisticGroup, StatisticLabel, StatisticValue } from "semantic-ui-react";


interface GameLayoutProps {

    pageTitle:string
    gameName: string,
    authorName: string,
    minNumber: number,
    maxNumber: number,
    leftChild: ReactNode,
    rightChild: ReactNode,


}

export default function GamePlayLayOut({
    pageTitle,
    gameName,
    authorName,
    minNumber,
    maxNumber,
    leftChild,
    rightChild,


}: GameLayoutProps) {



    return (
        <>
            <Segment clearing inverted>
                <Grid celled>
                    <GridRow centered>
                        <Header as='h1' textAlign='center' inverted style={{ color: 'white' }}>
                            {gameName} <Header.Subheader > by {authorName}</Header.Subheader>
                        </Header>
                    </GridRow>
                    <GridRow columns={2}>
                        <GridColumn width={10}>
                            <GridRow>
                                <Header as='h3' textAlign='center' style={{ color: 'white' }} >Number Range</Header>
                                <StatisticGroup style={{ 'justifyContent': 'center', 'gap': '40px' }} size='mini' inverted>
                                    <Statistic floated='right'>
                                        <StatisticLabel>Min Number</StatisticLabel>
                                        <StatisticValue>{minNumber}</StatisticValue>
                                    </Statistic>
                                    <Statistic floated='left'>
                                        <StatisticLabel>Max Number</StatisticLabel>
                                        <StatisticValue>{maxNumber}</StatisticValue>
                                    </Statistic>
                                </StatisticGroup>
                            </GridRow>

                        </GridColumn>

                        <GridColumn width={6}>
                            <Header as='h3' textAlign='center' style={{ color: 'white' }} > {pageTitle} </Header>
                        </GridColumn>
                    </GridRow>

                    <GridRow columns={2}>
                        <GridColumn width={10}>
                            <Header as='h3' textAlign='center' style={{ color: 'white' }} >Rules</Header>
                            {leftChild}

                        </GridColumn>

                        <GridColumn width={6}>

                            {rightChild}

                        </GridColumn>
                    </GridRow>
                </Grid>
            </Segment>
        </>


    );

}