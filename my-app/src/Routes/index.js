import React from "react";
import { Route, Switch } from "react-router";
import Home from "../Components/Home/home";
import Log from "../Components/LogIn";


const index = () => {
    return(
            <div>
                {/* <Route path='/main' component={Nav} /> */}
                <Switch >
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Log} />
                    
                </Switch>
            </div>
    );
};
export default index;