import React from "react";
import { Route, Switch } from "react-router";
import Home from "../Components/Home/home";
import Log from "../Components/LogIn";
import Prueba from "../Components/Prueba/Prueba"
import Form from '../Components/Home/Form/Form'
import SelectType from "../Components/SelectType/SelectType";


const index = () => {
    return(
            <div>
                {/* <Route path='/main' component={Nav} /> */}
                <Switch >
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Log} />
                    <Route exact path='/formWalker' component={Form} />
                    <Route exact path='/selectType' component={SelectType}/>
                    <Route exact path='/cardsUsers' component={Prueba}/>
                </Switch>
            </div>
    );
};
export default index;