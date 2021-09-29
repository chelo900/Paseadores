import React from "react";
import { Route, Switch } from "react-router";
import Home from "../Components/Home/home";
import Log from "../Components/LogIn";
import Prueba from "../Components/Prueba/Prueba"

const index = () => {
    return(
            <div>
                {/* <Route path='/main' component={Nav} /> */}
                <Switch >
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Log} />
                    <Route exact path='/sign' component={Form}/>
                </Switch>
            </div>
    );
};
export default index;