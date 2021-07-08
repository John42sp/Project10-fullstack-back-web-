import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
// import { login } from "../../services/auth";
import { setUserSession } from "../../services/auth";
import api from "../../services/api";
import axios from 'axios';

  function Help() {        

    return (
      <>            
        <div id="app">
        <aside id="menu">
        <h1><strong>Help</strong></h1>
        <Link to="/devs"><button >Cadastrar</button> </Link>     
            <Link to="/devs/login"><button>Login</button></Link>   
            <Link to="/saibamais"><button >Saiba Mais</button></Link>  
            <Link to="/"><button >Pagágina Inicial</button></Link>    
        </aside>
        <main>


        </main>   
    </div>           
        </>
    )
}


export default withRouter(Help);