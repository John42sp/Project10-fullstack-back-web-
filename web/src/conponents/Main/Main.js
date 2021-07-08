import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Jumbotron, Button } from 'reactstrap';
import axios from 'axios';


  function Main() {          
      const [ globalConf, setGlobalConf ] = useState();
      const [ globalRecov, setGlobalRecov ] = useState();
      const [ globalUnres, setGlobalUnres ] = useState();
      const [ globalDeaths, setGlobalDeaths ] = useState();
      const [ globalCasesToday, setGlobalCasesToday ] = useState();
      const [ globalDeathsToday, setGlobalDeathsToday ] = useState();
      const [ globalActiveCases, setGlobalActiveCases ] = useState();
      const [ globalSeriousCases, setGlobalSeriousCases ] = useState();

      const [ usConf, setUsConf ] = useState();
      const [ usRecov, setUsRecov ] = useState();
      const [ usUnres, setUsUnres ] = useState();
      const [ usDeaths, setUsDeaths ] = useState();
      const [ usCasesToday, setUsCasesToday ] = useState();
      const [ usDeathsToday, setUsDeathsToday ] = useState();
      const [ usActiveCases, setUsActiveCases ] = useState();
      const [ usSeriousCases, setUsSeriousCases ] = useState();
      const [ usRank, setUsRank ] = useState();

      const [ brConf, setBrConf ] = useState();
      const [ brRecov, setBrRecov ] = useState();
      const [ brUnres, setBrUnres ] = useState();
      const [ brDeaths, setBrDeaths ] = useState();
      const [ brCasesToday, setBrCasesToday ] = useState();
      const [ brDeathsToday, setBrDeathsToday ] = useState();
      const [ brActiveCases, setBrActiveCases ] = useState();
      const [ brSeriousCases, setBrSeriousCases ] = useState();
      const [ brRank, setBrRank ] = useState();

    const covid19 = axios.create({
      baseURL: "https://api.thevirustracker.com"
  });

  async function loadGlobalData() {     
    let responseGlobal = await covid19.get('/free-api?global=stats');    
    let { results: [{ total_cases, total_recovered, total_unresolved, total_deaths, total_new_cases_today, total_new_deaths_today, total_active_cases, total_serious_cases }]} = responseGlobal.data;    

      let objectGlobal   = {
        confirmed: total_cases,
        recovered: total_recovered,
        unresolved: total_unresolved,
        deaths: total_deaths,
        casesToday: total_new_cases_today,        
        deathsToday: total_new_deaths_today,
        activeCases: total_active_cases,
        seriousCases: total_serious_cases       
      } 
     
      const globalConfirmed = objectGlobal.confirmed;
      const globalRecovered = objectGlobal.recovered;
      const globalUnresolved = objectGlobal.unresolved;
      const globalDeaths = objectGlobal.deaths;
      const globalNewToday = objectGlobal.casesToday;
      const globalDeathsToday = objectGlobal.deathsToday;
      const globalActive = objectGlobal.activeCases;
      const globalSeriousCases = objectGlobal.seriousCases;

      setGlobalConf(globalConfirmed.toLocaleString('pt-BR', {}));
      setGlobalRecov(globalRecovered.toLocaleString('pt-BR', {}));
      setGlobalUnres(globalUnresolved.toLocaleString('pt-BR', {}));
      setGlobalDeaths(globalDeaths.toLocaleString('pt-BR', {}));
      setGlobalCasesToday(globalNewToday.toLocaleString('pt-BR', {}));
      setGlobalDeathsToday(globalDeathsToday.toLocaleString('pt-BR', {}))
      setGlobalActiveCases(globalActive.toLocaleString('pt-BR', {}));
      setGlobalSeriousCases(globalSeriousCases.toLocaleString('pt-BR', {}));    

    // /v2/locations?country_code=BR
    // response = response.slice(response.length - 1);  //slice funciona com vetor de strings, mas nao de objetos '{ }'

    // let [{ Country, CountryCode, Slug, Date, Cases }] = response.data;
    // let object = {
    //   Country,
    //   CountryCode,
    //   Slug,
    //   Date,
    //   Cases
    // }   
    // console.log(object)
    // setUsData(object);
   
  }  

  async function loadUSData() {     
    let responseUS = await covid19.get('/free-api?countryTotal=US');    
    let { countrydata: [{ total_cases, total_recovered, total_unresolved, total_deaths, total_new_cases_today, total_new_deaths_today, total_active_cases, total_serious_cases, total_danger_rank }]} = responseUS.data;    

      let objectUS   = {
        confirmed: total_cases,
        recovered: total_recovered,
        unresolved: total_unresolved,
        deaths: total_deaths,
        casesToday: total_new_cases_today,        
        deathsToday: total_new_deaths_today,
        activeCases: total_active_cases,
        seriousCases: total_serious_cases,  
        rank: total_danger_rank
      } 
     
      const usConfirmed = objectUS.confirmed;
      const usRecovered = objectUS.recovered;
      const usUnresolved = objectUS.unresolved;
      const usDeaths = objectUS.deaths;
      const usNewToday = objectUS.casesToday;
      const usDeathsToday = objectUS.deathsToday;
      const usActive = objectUS.activeCases;
      const usSeriousCases = objectUS.seriousCases;
      const usRank = objectUS.rank;

      setUsConf(usConfirmed.toLocaleString('pt-BR', {}));
      setUsRecov(usRecovered.toLocaleString('pt-BR', {}));
      setUsUnres(usUnresolved.toLocaleString('pt-BR', {}));
      setUsDeaths(usDeaths.toLocaleString('pt-BR', {}));
      setUsCasesToday(usNewToday.toLocaleString('pt-BR', {}));
      setUsDeathsToday(usDeathsToday.toLocaleString('pt-BR', {}))
      setUsActiveCases(usActive.toLocaleString('pt-BR', {}));
      setUsSeriousCases(usSeriousCases.toLocaleString('pt-BR', {})); 
      setUsRank(usRank.toLocaleString('pt-BR', {})); 
   
  } 

  async function loadBRData() {     
    let responseBR = await covid19.get('/free-api?countryTotal=BR');    
    let { countrydata: [{ total_cases, total_recovered, total_unresolved, total_deaths, total_new_cases_today, total_new_deaths_today, total_active_cases, total_serious_cases, total_danger_rank }]} = responseBR.data;    

      let objectBR   = {
        confirmed: total_cases,
        recovered: total_recovered,
        unresolved: total_unresolved,
        deaths: total_deaths,
        casesToday: total_new_cases_today,        
        deathsToday: total_new_deaths_today,
        activeCases: total_active_cases,
        seriousCases: total_serious_cases,    
        rank: total_danger_rank   
      } 
     
      const brConfirmed = objectBR.confirmed;
      const brRecovered = objectBR.recovered;
      const brUnresolved = objectBR.unresolved;
      const brDeaths = objectBR.deaths;
      const brNewToday = objectBR.casesToday;
      const brDeathsToday = objectBR.deathsToday;
      const brActive = objectBR.activeCases;
      const brSeriousCases = objectBR.seriousCases;
      const brRank = objectBR.rank;

      setBrConf(brConfirmed.toLocaleString('pt-BR', {}));
      setBrRecov(brRecovered.toLocaleString('pt-BR', {}));
      setBrUnres(brUnresolved.toLocaleString('pt-BR', {}));
      setBrDeaths(brDeaths.toLocaleString('pt-BR', {}));
      setBrCasesToday(brNewToday.toLocaleString('pt-BR', {}));
      setBrDeathsToday(brDeathsToday.toLocaleString('pt-BR', {}))
      setBrActiveCases(brActive.toLocaleString('pt-BR', {}));
      setBrSeriousCases(brSeriousCases.toLocaleString('pt-BR', {})); 
      setBrRank(brRank.toLocaleString('pt-BR', {})); 
  } 

// buscar os devs cadastrados, na api
useEffect(() => {
  loadGlobalData();
  loadUSData();
  loadBRData();
}, []);

    return (
      <>       
     <div id="app">
        <aside id="menu">
            <h1><strong>Bem-vindo!</strong></h1>
            <Link to="/devs/new"><button>Cadastro</button> </Link>     
            <Link to="/devs/login"><button>Login</button></Link>   
            <Link to="/help"><button>Help</button></Link>  
            <Link to="/saibamais"><button >Saiba mais</button></Link>   
            {/* <Link to="/saibamais"><button style={{width:"50%", marginLeft:"25%"}}>Saiba mais</button></Link>   */}
            
        </aside>
        <main>
        <Jumbotron>
        <h1 className="display-3">Pagina Inicial</h1>  
        <br></br>      
        <hr className="my-2" />        
        <br></br>
        <p className="lead">Efetue seu cadastro ou faça seu login.</p>        
        <br></br>
        <p>Dúvidas? Clique em Help para saber mais e esclarecer dúvidas.</p>
        <br></br>
        <br></br>
        <br></br>
        <h2 className="display-1">Coronavirus Update (Tempo Real)</h2>
        <p>Fonte: "https://thevirustracker.com/"</p>
        <br></br>
        <hr className="my-2" />   
      </Jumbotron>
        <br></br>
      <div className="corona">
      <div>
         <h3>Situação</h3>
          <br></br>
          <h4>Total Casos Confirmados:</h4>
          <h4>Total Recuperados: </h4>
          {/* <h4>Total Não Recuperados: </h4>         */}
          <h4>Total Mortos: </h4>
          <h4>Total Novos Casos Hoje: </h4>
          <h4>Total Mortos Hoje: </h4>
          {/* <h4>Total Casos Ativos: </h4> */}
          <h4>Total Casos Serios / Graves: </h4>
          <h4>Ranking em nº casos: </h4>
        </div>
        <div>
          <h3>Mundo</h3>
          <br></br>
          <h4> {globalConf ? globalConf : "Loading..."}</h4>
          <h4> {globalRecov}</h4>
          {/* <h4> {globalUnres}</h4>         */}
          <h4> {globalDeaths}</h4>
          <h4> {globalCasesToday}</h4>
          <h4> {globalDeathsToday}</h4>
          {/* <h4> {globalActiveCases}</h4> */}
          <h4> {globalSeriousCases}</h4>
          
        </div>

        <div>
          <h3>EUA</h3>
          <br></br>
          <h4> {usConf}</h4>
          <h4> {usRecov}</h4>
          {/* <h4> {usUnres}</h4>         */}
          <h4> {usDeaths}</h4>
          <h4> {usCasesToday}</h4>
          <h4> {usDeathsToday}</h4>
          {/* <h4> {usActiveCases}</h4> */}
          <h4> {usSeriousCases}</h4>
          <h4> {usRank}</h4>
        </div>

        <div>
          <h3>Brasil</h3>
          <br></br>
          <h4>{brConf}</h4>
          <h4>{brRecov}</h4>
          {/* <h4>{brUnres}</h4>         */}
          <h4> {brDeaths}</h4>
          <h4>{brCasesToday}</h4>
          <h4> {brDeathsToday}</h4>
          {/* <h4> {brActiveCases}</h4> */}
          <h4> {brSeriousCases}</h4>
          <h4> {brRank}</h4>
        </div>
        {JSON.stringify()}</div>
     
          
        </main>   
    </div>}
        </>
    )
}

export default withRouter(Main);