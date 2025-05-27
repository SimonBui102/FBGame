import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import GameForm from "../components/GameForm";
import GameTable from "../components/GameTable";
import GameRule from "../components/GameRule";
import GamePlay from "../components/GamePlay";

export const routes: RouteObject[] = [

    {
        path: '/',
        element: <App />,
        children: [

            { path: 'createGameDefinition', element: <GameForm key='create' /> },
            { path: 'gameRule/:id', element: <GameRule key='displayRule' /> },
            { path: 'gamesessions/:id', element: <GamePlay key='gamePlay' /> },
            {path: '*', element:<GameTable/>}


        ]


    }

]

export const router = createBrowserRouter(routes);