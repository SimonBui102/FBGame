import { Button } from "semantic-ui-react";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import { NavLink } from "react-router-dom";

interface Props {
    gameDefinition: GameDefinitionDto;
}

export default function GameTableItem({ gameDefinition }: Props) {

    return (
        <>
            <tr className="center aligned">
                <td data-label="Id">{gameDefinition.id}</td>
                <td data-label="GameName">{gameDefinition.gameName}</td>
                <td data-label="AuthorName">{gameDefinition.authorName}</td>
                <td data-label="CreateDate">{gameDefinition.createDate}</td>
                <td data-label="Action">
                    <Button as={NavLink} to={ `gameRule/${gameDefinition.id}`} color="blue" type="submit">
                    Play
                    </Button>
                </td>
                
            </tr>
        </>
    );
}