import { Button, Container } from "semantic-ui-react";
import apiConnector from "../api/apiConnector";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import { useEffect, useState } from "react";
import GameTableItem from "./GameTableItem";
import { NavLink } from "react-router-dom";
export default function GameTable() {


    const [gamesDefinition, setGamesDefinition] = useState<GameDefinitionDto[]>([]);

    useEffect(() => {

        const fetchData = async () => {

            const fetchedGamesDefinition = await apiConnector.getGamesDefinition();
            setGamesDefinition(fetchedGamesDefinition);

        }

        fetchData();

    }, []);
    return (
        <>
            <Container className = "container-style">
                <table className = "ui inverted table">

                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th>ID</th>
                            <th>Game Name</th>
                            <th>Author Name</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        {gamesDefinition.length !== 0 && (
                            gamesDefinition.map((gameDefinition, index) => (

                                <GameTableItem key={index} gameDefinition={gameDefinition }/>

                            ))
                        
                        )}
                    </tbody>

                </table>
                <Button as={NavLink} to="createGameDefinition" floated="right" type="button" content = "Create Game Definition" positive/>
            </Container>


        </>
    );

}