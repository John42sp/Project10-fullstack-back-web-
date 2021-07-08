import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import DevForm from './conponents/DevForm/index';
import Login from './conponents/Login/Login';
import Help from './conponents/Help/Help';
import SaibaMais from './conponents/SaibaMais/SaibaMais';
import App from './conponents/App/App';
import Main from './conponents/Main/Main';
import MyProf from './conponents/Profile/MyProfile';
import DevProf from './conponents/Profile/DevProfile';
import DevUpdateForm from './conponents/Update/DevUpdate';
import './global.css';
import './Sidebar.css';
import './Main.css';

const isAuth = () => {
  if(localStorage.getItem('token')  !== null)  {
    return true;
  }
  return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { message: 'Usuário não autorizado' } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={() => <Main/>} />     //somente sidebar.css 
    <Route path="/devs/new" component={() => <DevForm/> } />  //somente sidebar.css 
    <Route path="/devs/login" component={() => <Login/>} />  //somente sidebar.css  
    <Route path="/help" component={() => <Help/>} /> //somente sidebar.css 
    <Route path="/saibamais" component={() => <SaibaMais/>   } />   //somente sidebar.css 
    
    <PrivateRoute path="/welcome" component={() => <App/>} />   //somente Main.css
    <PrivateRoute path="/myprofile" component={() => <MyProf/>}/>    //somente Main.css
    <PrivateRoute path="/devprofile" component={() => <DevProf/>}/>    //somente Main.css
    

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;