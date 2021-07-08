import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import { setUserSession } from "../../services/auth";
import axios from 'axios';

  function Login({ history }) {       
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    async function handleAddLogin(e) {
      e.preventDefault();    
      setError(null)
          await axios.post('http://localhost:5555/devs/login', { email, password })//fazer chamada na api
      .then(response => {
      const { token, dev } = response.data;    
      console.log(response.data);    
      
      setUserSession(token, dev);   // para salvar id do usuário no navegador
      history.push('/welcome');        //executa a propriedade levando para a rota/pag. dashboard  
      })      
    }   
     
    return (
      <>
        
        <div id="app">
        <aside>
            <strong>Login</strong>
            <form onSubmit={handleAddLogin}>                    
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
              <button type="submit">Entrar</button>              
            </form>  
          
            <Link to="/devs/new">
                <button>Cadastrar</button>   
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


export default withRouter(Login);