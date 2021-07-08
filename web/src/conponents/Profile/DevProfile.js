
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import api from '../../services/api';

import { getUser, removeUserSession } from "../../services/auth";


import '../../global.css';
import '../../Main.css';

// navigator.geolocation.getCurrentPosition() já está disponivel de forma global no app, so usar
// serve para capturar latitude e logitude no frontend! se demorar ou nao capturar, pegar infos no google maps manual 

function DevProf({ match }) {

  const [ dev, setDev ] = useState({});  //para buscar perfil de um dev

  // const dev = localStorage.getItem('dev');

    
  useEffect(() => {                    //executar uma função assim que usuário acessar a pagina
    async function devProf() {           //para buscar perfil de um dev
        const _id = localStorage.getItem('dev');
        console.log(_id)
        const response = await api.get('/devprofile', {
            headers: { _id }
        });
        // console.log(response.data);
        setDev(response.data);
        console.log(response.data);
    }
    devProf();
}, [match.params.id]);

    // handle click event of logout button
    // const handleLogout = () => {    
    //   // removeUserSession();
    //   localStorage.removeItem('dev');
    //   history.push('/devs/login');
    // }  
 

  
  
    // handle click event of logout button
  // const handleLogout = () => {    
  //   removeUserSession();
  //   // localStorage.removeItem('token');
  //   history.push('/devs/login');
  // }  
  // useEffect(() => {   
  // }, []);
  
  return (
      <div id="app">  
         <main style={{maxWidth:"50%"}}>  
            <h2>Página do usuário {dev.name}! </h2> 
            <br></br>
            <img src={dev.avatar_url} alt={dev.name}/>
            <h2>{dev.name}</h2>                     
             <br></br>
              <h5>Email: {dev.email}</h5>
              {/* <h5>Tecnologias: {dev.techs.length > 1 ? dev.techs.join(', ') : dev.techs}</h5>             */}
              <h5>Usuário Github: {dev.github_username}</h5>
              <h5>Bio: {dev.bio ? " "+dev.bio : "  A informar"}</h5>
              {/* <h6>Localização: {dev.location}</h6> */}
              <button ><Link style={{color:"white", textDecoration:"none"}} to="/welcome">Página Principal</Link></button>  
            {/* <button onClick={handleLogout}>Logout</button>                      */}
        </main>
   
    </div>
    
  );
}

export default withRouter(DevProf);
