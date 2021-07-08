// import React, { useState } from 'react';


// function App() {
//   const [ counter, setCounter ] = useState(0);

//   function incrementCounter() {
//     setCounter(counter + 1)
//   }

//   return (
//     <>
//     <h1>Contador: {counter}</h1>
//     <button onClick={incrementCounter}>Incrementar</button>
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import api from '../../services/api';
import DevUpdateForm from '../../conponents/Update/DevUpdate';
import PicHandler from '../../conponents/PicHandler/PicHandler';
import GoogleMap from './GoogleMap';
import '../../global.css';
import '../../Main.css';
import './App.css';
import '../Profile/styles.css';
import axios from 'axios';
import $ from 'jquery';
import { getUser, setUserSession, removeUserSession, getToken } from "../../services/auth";

// navigator.geolocation.getCurrentPosition() já está disponivel de forma global no app, so usar
// serve para capturar latitude e logitude no frontend! se demorar ou nao capturar, pegar infos no google maps manual 

function App({ match, history }) {
  
  const [devs, setDevs] = useState([]);
  const [name, setName] = useState('');
  const [devProf, setDevProf] = useState('');
  const [galery, setGalery ] = useState([]);
  

  let reverseDevs = devs.reverse();
      
  const token = getToken();
  const dev = getUser();
  const { _id } = dev;
  console.log(dev);  
  console.log(dev._id)

  const myProfPage = () => {    
     setUserSession(token, dev);   
    history.push('/myprofile'); 
  }   
  
  // handle click event of logout button
  const handleLogout = () => {    
    removeUserSession();
    // localStorage.removeItem('token');
    history.push('/devs/login');
  }  

// buscar os devs cadastrados, na api
useEffect(() => {
  async function loadDevs() {
    const response = await api.get('/welcome');
    setDevs(response.data);      
  } 
  loadDevs();   
}, []);

async function handleSubmit(e) {
  e.preventDefault()
  
  // const name = name.trim(); 
  const response = await api.get(`/devs?name=${name}`)    //fazer chamada na api  
  
    setDevProf(response.data)
    console.log(response.data)  
}

async function reset(){
  var resetInput = await document.getElementById("busca");
  if(resetInput){
  resetInput.value= "";
  }
}

// async function profUpdateFunction(e) {
//   e.preventDefault(); 
//   setProfUpdate(true)  
// }

async function closeDevProf(e) {  
  setDevProf(null)  
  reset();
}

async function deleteDev(id, pos) {    
  await api.delete(`/devs/${id}`)
  setDevs([
      ...devs.slice(0, pos),
      ...devs.slice(pos+1)
  ])
} 
// jquery block 
// $(document).ready(function() { 
//   $('#update').click(function() {
//     $('.app-myProfile').toggle();
//   });
// });

function switchVisible() {
  if (document.getElementById('myProfile')) {

      if (document.getElementById('myProfile').style.display == 'none') {
          document.getElementById('myProfile').style.display = 'block';
          document.getElementById('logoutButton').style.display = 'inline-block';
          document.getElementById('myProfButton').style.display = 'inline-block';
          document.getElementById('update').style.display = 'none';
      }
      else {
          document.getElementById('myProfile').style.display = 'none';
          document.getElementById('update').style.display = 'block';
          document.getElementById('logoutButton').style.display = 'none';
          document.getElementById('myProfButton').style.display = 'none';
      }
  }
}

$("#myButton").click(function () {            
  if($("#myButton").text() == "Editar") { 
    // $(".myTable").hide();
    $("#myButton").text("Cancelar");  
  } 
  else {
    // $(".myTable").show();
    $("#myButton").text("Editar");
  }  
});



// useEffect(() => {

//   async function mapFunction() {

//     const latitude = dev.latitude;
//     const longitude = dev.longitude;

//     // axios.get("https://www.google.com/maps/@-26.9934171,-48.6309362,17.89z");
//     const response = axios.get(`https://www.google.com/maps/@${latitude},${longitude},17.89z`);
//     setDevMap(response.data);
//   }
//   mapFunction();   
// }, []);

useEffect(() => {         //renderizar pics de usuário logado
  async function loadPics() {
    const response = await api.get('/devs/getpics', {
      headers: { _id }
  });
    setGalery(response.data);    
    console.log(response.data) 
   }
   
  loadPics();   
}, [match.params.id]);


async function deletePic(id, pos) {    //
  await api.delete(`/devs/pics/${id}`)
  setGalery([
      ...galery.slice(0, pos),
      ...galery.slice(pos+1)
  ])
}

 return (
    <div id="app">         
      <main>           
      <div className="top">
        <div className="app-profile">

            <div id="update">
                <DevUpdateForm />                             
            </div> 
             
            <div id="myProfile">
              <img src={dev.avatar_url} alt={dev.name}/>  
              <h1> {dev.name}!  </h1>         
              <h3><strong>E-mail: </strong>{dev.email ? dev.email : "a informar"}</h3>
              <h3><strong>Github: </strong>{dev.github_username}</h3>       
              <h3><strong>Techs: </strong>{dev.techs.join(', ')}</h3>
              <h3><strong>Bio: </strong>{dev.bio ? dev.bio : "A informar"}</h3> 
              <h3><strong>Local: </strong>{dev.location.coordinates}</h3> 
              
              {(galery.length > 0) ? 
              <div >
                <h3><strong>Fotos:</strong></h3>
                <ul className="spot-list">        
                  {galery.map((gal, pos) => (
                      <li key={gal._id} className="li-main">
                          <header style={{ backgroundImage: `url(${gal.thumbnail_url})`}}/> 
                          <span>{gal.description ? gal.description : ''}</span>
                          <button className="btn-del-gal"  onClick={(e) => deletePic(gal._id, pos)} >Apagar</button>
                          
                      </li>

                  ))}
              </ul>
            </div> : ""}

            <h3><strong>Meu local no mapa:</strong></h3>
              <div id="mapMyProf">              
                <GoogleMap />            
              </div>

            </div>   
            <div className="pichandler-btns">
                <button id="logoutButton" onClick={handleLogout}>Logout</button> 
                <button id="myProfButton" onClick={myProfPage} >Visite seu perfil</button>
                <button type="button" id="myButton" onClick={switchVisible}>Editar</button> 
            </div>
          
        </div>
       
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="busca">Busca Rápida de Usuários</label>
            <input
            id="busca"
            type="text"
            placeholder="Digite o nome (sensível a caixa alta e espaços)"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            />    
            <button className="btn" type="submit">Buscar</button>
          </form>
          
         {devProf ?         
          <div className="dev-search">
            <header>
              <img src={devProf.avatar_url} alt={devProf.name}/>  
              <div className="user-info">
                <h1> {devProf.name}!  </h1>         
                <h5><strong>E-mail:</strong> {devProf.email ? devProf.email : "a informar"}</h5> 
                <h5><strong>Github:</strong> {devProf.github_username}</h5>
                <h5><strong>Techs:</strong> {devProf.techs ? devProf.techs.join(', ') : "A informar"}</h5> 
              </div>              
            </header>            
            <h5><strong>Bio:</strong> {devProf.bio ? devProf.bio : "A informar"}</h5>   
            <h5>Localização: {devProf.location.coordinates}</h5>  
            <div id="mapMyProf">
                <GoogleMap />            
              </div>
            <button  onClick={(e) => closeDevProf(e)}>Fechar</button>   
          </div>  
          : 
          <div className="img-upload">            
                <PicHandler />
          </div>}
        </div>        
      </div>
      
        <ul>
         {reverseDevs.map((dev, pos) => (
            <li key={dev._id} className="dev-search">
            <header>              
              <img src={dev.avatar_url} alt={dev.name}/>
              <div className="user-info">
                <h3><strong>{dev.name}</strong></h3>
                <h5><strong>E-mail:</strong> {dev.email ? " "+dev.email : " email@email.com"}</h5> 
                <h5><strong>Techs:</strong> {dev.techs ? dev.techs.join(', ') : "A informar"}</h5> 
                <h5><strong>Github: </strong> {dev.github_username ? dev.github_username : "A informar"}</h5> 
                <h5><strong>Local:</strong> {dev.location.coordinates}</h5>
                                
              </div>
            </header>
            <p><strong>Bio:</strong>{dev.bio ? " "+ dev.bio : " A informar."}</p> 
            {(dev.pics.length > 0) ? 
              <div >
                <h5><strong>Fotos:</strong></h5>
                <ul className="spot-list">        
                  {dev.pics.map((dp) => (
                      <li key={dp._id} className="li-main-devs">
                          <header style={{ backgroundImage: `url(${dp.thumbnail_url})`}}/> 
                          <span>{dp.description ? dp.description : ''}</span>                          
                      </li>
                  ))}
              </ul>
            </div> : ""}
            

            <div id="mapDevs">
                <GoogleMap />            
              </div> 
            <footer >
              <button><a href={`https://github.com/${dev.github_username}`}>Github</a></button>
              <button  onClick={(e) => deleteDev(dev._id, pos)}>Apagar</button>  
            </footer>         
                             
          </li>
         ))}
          
        </ul>
        
      </main>
   
    </div>
  );
}

export default withRouter(App);
