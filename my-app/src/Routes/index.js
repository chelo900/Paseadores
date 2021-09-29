import React from "react";
import { Route, Switch } from "react-router";
import FormWalker from "../Components/Home/Form/form";
import Home from "../Components/Home/home";
import PreLogin from "../Components/Home/PreLogin/PreLogin";
import Log from "../Components/LogIn";


const index = () => {
    return(
            <div>
                {/* <Route path='/main' component={Nav} /> */}
                <Switch >
                    <Route exact path='/' component={Home} />
                    <Route exact path ='/pre-login' component={PreLogin}/>
                    <Route exact path ='/login-walkwer' component={FormWalker}/>
                    <Route exact path='/login' component={Log} />
                </Switch>
            </div>
    );
};
export default index;