import { createBrowserRouter, type RouteObject } from "react-router-dom";
import App from "../App";
import GameForm from "../components/GameForm";
import GameTable from "../components/GameTable";
import GameRule from "../components/GameRule";

export const routes: RouteObject[] = [

    {
        path: '/',
        element: <App />,
        children: [

            { path: 'createGameDefinition', element: <GameForm key='create' /> },
            {path:'gameRule/:id',element: <GameRule key='displayRule'/>},
            {path: '*', element:<GameTable/>}


        ]


    }

]

export const router = createBrowserRouter(routes);