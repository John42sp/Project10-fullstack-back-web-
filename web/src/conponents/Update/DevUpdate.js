import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import { getUser, getToken } from "../../services/auth";
import '../../global.css';
import '../../Main.css';
import './styles.css';

const DevUpdateForm = () => {   
  const token = getToken();
  let dev = getUser();
  // console.log(dev)

  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [techs, setTechs] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");


 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
         )
      }, []);    

      async function updateUser(e) {      
        e.preventDefault()
        const response = await api.put(`/devs/${dev._id}`,{            
          name,
          email,
          password,
          techs,
          latitude,
          longitude              
      })   
    
        console.log(response.data);
        let newDev = await response.data;        
        if(newDev){
          newDev.dev = dev;
          localStorage.setItem('dev', JSON.stringify(dev));
        }
        const dev = await localStorage.getItem('dev');
        if (dev) return JSON.parse(dev);
        else return null;
        

        // let newUser = response.data;
        // if(newUser){
        //   newUser.dev = dev;
        //   localStorage.setItem('dev', JSON.stringify(dev));
        //   localStorage.getItem('dev', JSON.parse(dev));
        // }
        // return dev
        // setCurrentUser(dev)
                 
        setName('');
        setEmail('');
        setPassword('');
        setTechs('');
        
    } 

      
    return (               
          <div className="update-profile">     
            <strong>Alterar</strong>
            <img src={dev.avatar_url} alt={dev.name}/>             
            <form onSubmit={updateUser} >
              <div className="input-block">
                <label htmlFor="name">Nome:</label>
                <input 
                  name="name" 
                  id="name" 
                  type="text"
                  placeholder={"Alterar nome"}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  />
              </div>
              
              <div className="input-block">
                <label htmlFor="email">E-mail:</label>
                <input 
                  name="email" 
                  id="email" 
                  type="text"
                  placeholder={"Alterar email"}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="password">Senha:</label>
                <input 
                  name="password" 
                  id="password" 
                  type="password"
                  placeholder={"Digite nova senha"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  />
              </div>
              {/* <div className="input-block">
                <label htmlFor="github_username">Github:</label>
                <input 
                  name="github_username" 
                  id="githum_username" 
                  type="text"
                  placeholder={"Alterar usuário Github"}
                  value={github_username}
                  onChange={e => setGithubusername(e.target.value)}
                  />
              </div> */}
              <div className="input-block">
                <label htmlFor="techs">Techs:</label>
                <input 
                  name="techs" 
                  id="techs" 
                  type="text"                 
                  placeholder={"Alterar tecnologias"}   
                  value={techs}
                  onChange={e => setTechs(e.target.value)}
                  />
              </div>
                                                      {/* ambos será preenchido automaticamente */}
              <div className="input-group">                
                <div className="input-block">
                  <label htmlFor="latitude">Latitude:</label>
                  <input 
                    type= "number"
                    name="latitude" 
                    id="latitude"               
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}
                  />
            
                </div>
                <div className="input-block">
                  <label htmlFor="longitude">Longitude:</label>
                  <input 
                    type="number" 
                    name="longitude" 
                    id="longitude" 
                    type="text"                             
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" >Salvar</button>
            </form>
            <h3>If need to edit github username, please delete profile and create a new one.</h3>
          </div>        
    )
}

export default DevUpdateForm;
