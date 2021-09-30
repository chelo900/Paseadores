import React from "react";
import { Route, Switch } from "react-router";
import EditPrice from "../Components/EditWalker/EditPrice/Edit.jsx";
import EditDescription from "../Components/EditWalker/EditDescription/Edit";
import Form from "../Components/FormWalker/Form";
import Home from "../Components/Home/home";
import PreLogin from "../Components/Home/PreLogin/PreLogin";
import Log from "../Components/LogIn"
import Prueba from "../Components/Prueba/Prueba"
import Form from '../Components/Home/Form/Form'
import SelectType from "../Components/SelectType/SelectType";
import PerfilWalker from "../Components/PerfilWalker/PerfilWalker";
import EditInformation from "../Components/EditWalker/EditInformation/Edit.jsx";

const index = () => {
    return(
            <div>
                {/* <Route path='/main' component={Nav} /> */}
                <Switch >
                    <Route exact path='/' component={Home} />
                    <Route exact path ='/pre-login' component={PreLogin}/>
                    <Route exact path ='/login-walkwer' component={Form}/>
                    <Route exact path='/login' component={Log} />
                    <Route exact path='/formWalker' component={Form} />
                    <Route exact path='/selectType' component={SelectType}/>
                    <Route exact path='/cardsUsers' component={Prueba}/>
                    <Route exact path ='/walker/perfil/:id' component = {PerfilWalker}/>
                    <Route exact path ='/walker/editDescription' component={EditDescription}/>
                    <Route exact path ='/walker/editPrice' component={EditPrice}/>
                    <Route exact path ='/walker/editInformation' component={EditInformation}/>
                </Switch>
            </div>
    );
};
export default index;