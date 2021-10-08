import React from "react";
import { Route, Switch } from "react-router";
import FormWalker from "../Components/FormWalker/FormWalker";
import Home from "../Components/Home/home";
import PreLogin from "../Components/Home/PreLogin/PreLogin";
import Login from "../Components/Login/Login.jsx";
import recoverPassword from "../Components/Login/RecoverPassword";
import NewPassword from "../Components/Login/NewPassword";
import UsersCards from "../Components/UsersCards/UsersCards";
import Form from "../Components/Home/Form/Form";
import SelectType from "../Components/SelectType/SelectType";
import PerfilWalker from "../Components/PerfilWalker/PerfilWalker";
import EditInformation from "../Components/EditWalker/EditInformation/Edit.jsx";
import EditPrice from "../Components/EditWalker/EditPrice/Edit.jsx";
import EditDescription from "../Components/EditWalker/EditDescription/Edit";
import EditHorarios from "../Components/EditWalker/editHr/Edit";
import FormClient from "../ClientsComponents/FormClient/FormClient"
import PerfilCliente from "../ClientsComponents/perfilCliente/PerfilCliente";
import PerfilWalkerParaCliente from "../Components/PerfilWalker/PerfilWalkerParaCliente";
import descripcion from "../ClientsComponents/editInfoCliente/descripcion";
import informacion from "../ClientsComponents/editInfoCliente/informacion";

const index = () => {
  return (
    <div>
      {/* <Route path='/main' component={Nav} /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pre-login" component={PreLogin} />
        <Route exact path="/login-walkwer" component={FormWalker} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/recoverPassword" component={recoverPassword} />
        <Route exact path="/new-password/:token" component={NewPassword} />
        <Route exact path="/formWalker" component={Form} />
        <Route exact path="/selectType" component={SelectType} />
        <Route exact path="/cardsUsers" component={UsersCards} />
        <Route exact path="/walker/perfil/:id" component={PerfilWalker} />
        <Route exact path="/walker/editDescription/:id" component={EditDescription}/>
        <Route exact path="/walker/editPrice/:id" component={EditPrice} />
        <Route exact path="/walker/editInformation/:id" component={EditInformation}/>
        <Route exact path="/walker/edithr/:id" component={EditHorarios}/>
        <Route exact path="/Cliente/:id" component={PerfilCliente}/>
        <Route exact path="/walker/perfil/contacto/:id" component={PerfilWalkerParaCliente}/>


        {/* Rutas del cliente  */}
        <Route exact path= "/login-client" component={FormClient}/>
        <Route exact path="/Cliente/perfil/:id" component={PerfilCliente}/>
        <Route exact path="/Cliente/editDescription/:id" component={descripcion}/>
        <Route exact path="/Cliente/editInformation/:id" component={informacion}/>
      </Switch>
    </div>
  );
}
export default index;
