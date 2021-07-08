import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';

function DevForm() {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [github_username, setGithubusername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
  
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

      async function handleAddDev(e) {
          e.preventDefault();
          const response = await api.post('/devs/new',{            
            name,
            email,
            password,
            github_username,
            techs,
            latitude,
            longitude,             
        })   

          console.log(response.data);

          setName('');
          setEmail('');
          setPassword('');
          setGithubusername('');
          setTechs('');          
      }
      
    return (
        <>
         <div id="app">
          <aside>
              <strong>Cadastrar</strong>
           <form onSubmit={handleAddDev}>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                name="name" 
                id="name" 
                value={name}
                onChange={e => setName(e.target.value)}
                required />
            </div>
            
            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input 
                name="email" 
                id="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required />
            </div>
            <div className="input-block">
              <label htmlFor="password">Senha</label>
              <input 
                name="password" 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
            </div>
            <div className="input-block">
              <label htmlFor="github_username">Usuário do Github</label>
              <input 
                name="github_username" 
                id="githum_username" 
                value={github_username}
                onChange={e => setGithubusername(e.target.value)}
                required />
            </div>
            <div className="input-block">
              <label htmlFor="techs">Tecnologias</label>
              <input 
                name="techs" 
                id="techs" 
                value={techs}
                onChange={e => setTechs(e.target.value)}
                required />
            </div>
                                                    {/* ambos será preenchido automaticamente */}
            <div className="input-group">                
              <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input 
                  type= "number"
                  name="latitude" 
                  id="latitude" 
                  required 
                  value={latitude}
                  onChange={e => setLatitude(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                  type="number" 
                  name="longitude" 
                  id="longitude" 
                  required 
                  value={longitude}
                  onChange={e => setLongitude(e.target.value)}
                />
              </div>
            </div>
            <button type="submit">Salvar</button>
          </form>
         
          <Link to="/devs/login">
              <button>Login</button>   
          </Link>

          <Link to="/">
              <button>Tela Inicial</button>   
          </Link>
          </aside>
        <main>
        </main>   
    </div>            

        </>
    )
}

export default withRouter(DevForm);
