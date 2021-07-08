
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import GoogleMap from '../App/GoogleMap';
import api from '../../services/api';

import { getUser, removeUserSession } from "../../services/auth";

import './styles.css';
import '../../global.css';
import '../../Main.css'; 

// navigator.geolocation.getCurrentPosition() já está disponivel de forma global no app, so usar
// serve para capturar latitude e logitude no frontend! se demorar ou nao capturar, pegar infos no google maps manual 

function MyProf({ match, history }) { 

  const [ galery, setGalery ] = useState([]);
  
  const dev = getUser();   //para buscar o proprio perfil   {dev} ? {dev.name, etc...} : {profile.name, etc...}  
  const { _id } = dev;
  // console.log(dev);
  // console.log(_id);
  // console.log(dev._id)

  useEffect(() => {
    async function loadPics() {
      const response = await api.get('/devs/getpics', {
        headers: { _id }
    });
      setGalery(response.data);  
      console.log(response.data);
     }
    loadPics();   
  }, [match.params.id]);

  async function deletePic(id, pos) {    
    await api.delete(`/devs/pics/${id}`)
    setGalery([
        ...galery.slice(0, pos),
        ...galery.slice(pos+1)
    ])
}
 
    // handle click event of logout button
  const handleLogout = () => {    
    removeUserSession();
    // localStorage.removeItem('token');
    history.push('/devs/login');
  }  

  
  return (
   
    <div id="app">     
      <main className="prof-page" >    
          <div > 
          <h2>Bem vindo a sua página </h2>          
          <br></br>
          <div className="my-profile">
          <img src={dev.avatar_url} alt={dev.name}/>
          <h1>{dev.name}</h1>                     
           <br></br>
            <h3><strong>Email:</strong> {dev.email}</h3>
            <h3><strong>Tecnologias:</strong> {dev.techs.length > 1 ? dev.techs.join(', ') : dev.techs}</h3>             
            <h3><strong>Usuário Gitbub:</strong> {dev.github_username}</h3>
            <h3><strong>Bio:</strong> {dev.bio ? " "+dev.bio : "  A informar"}</h3>
            <h3><strong>Localização:</strong> {dev.location.coordinates}</h3>
            <h3><strong>Mapa:</strong></h3>
            <div id="mapMyProf">
                <GoogleMap />            
              </div>
          </div>         
            <button ><Link style={{color:"white", textDecoration:"none"}} to="/welcome">Página Principal</Link></button>                    
            <button onClick={handleLogout}>Logout</button>
            </div>

            <div >
              <h3><strong>Galeria de fotos:</strong></h3>
              {(galery.length > 0) ?
              <ul className="spot-list">        
                {galery.map((gal, pos) => (
                    <li key={gal._id} className="li-main">
                        <header style={{ backgroundImage: `url(${gal.thumbnail_url})`}}/> 
                        
                        {/* <span>TECHS: </span>
                        <span><ul>{(spot.techs).map((spt, i) => <li key={i}> {spt}</li>)}</ul></span>
                        techs.split(',').map(tech => tech.trim()), */}
                        <span>{gal.description ? gal.description : ''}</span>

                        <button className="btn-del-prof" outline onClick={(e) => deletePic(gal._id, pos)} >Apagar</button>
                        
                    </li>

                ))}

            </ul> : " Você ainda não tem nenhuma foto cadastrada. Publique sua 1ª foto na pagina principal."}


            </div>
          </main>
      </div>            
  );
}

export default withRouter(MyProf);
