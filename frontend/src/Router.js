import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
// o switch serve para garantir que erá chamada apenas uma rota por vez
import Logon from "./Pages/Logon";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import NewIncident from "./Pages/NewIncident";

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch> 
                <Route path="/" exact component={Logon} />   {/* EXACT eh necessario para que as outras rotas funcionem, pois sem ele todas as outras rotas levariam a essa base ja que todas iniciam com o mesmo caracter (/), e isso eh a unica coisa que a busca confere*/}
                <Route path="/Register" component={Register}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/Incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}
