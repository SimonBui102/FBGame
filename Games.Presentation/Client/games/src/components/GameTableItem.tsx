import { Button } from "semantic-ui-react";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";

interface Props {
    gameDefinition: GameDefinitionDto;
}

export default function GameTableItem({ gameDefinition }: Props) {

    return (
        <>
            <tr className="center algined">
                <td data-label="Id">{gameDefinition.id}</td>
                <td data-label="GameName">{gameDefinition.gameName}</td>
                <td data-label="AuthorName">{gameDefinition.authorName}</td>
                <td data-label="CreateDate">{gameDefinition.createDate}</td>
                <td data-label="Action">
                    <Button color="yellow" type="submit">
                    Edit
                    </Button>
                </td>
                
            </tr>
        </>
    );
}