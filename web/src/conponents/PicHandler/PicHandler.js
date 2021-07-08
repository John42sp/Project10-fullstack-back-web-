import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getUser } from "../../services/auth";
import camera from '../../assets/camera.png';
import './styles.css';

export default function PicHandler({ }) {

    const [ thumbnail, setThumbnail ] = useState(null);
    const [ description, setDescription ] = useState('');      

    const dev = getUser();   //para buscar o proprio perfil   {dev} ? {dev.name, etc...} : {profile.name, etc...}  
    const { _id } = dev;
    // console.log(dev);
    // console.log(_id);
    // console.log(dev._id)
    // console.log('hello from pichandler')

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;

    }, [thumbnail]);

    async function reset(){
        setThumbnail(null)
        var resetDesc = await document.getElementById("description");      
        if(resetDesc){
        resetDesc.value= "" ;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();        
        const data = new FormData();  //por estarmos utilizando 'multipart form' no insomnia, aqui usamos este metodo
        
        data.append('thumbnail', thumbnail);  //estamos informando todos estes valores no 'data'
        data.append('description', description);
                                                             //assim, apenas colocamos o data como 2º parametro
         await api.post('/devs/pics', data, {                   //3º parametro, headers e user_id
            headers: { _id }
        })  
       reset();
    }

    return (
        <>        
        <form onSubmit={handleSubmit} >
        <label >Upload de fotos e imagens:</label>
            <label 
            id="thumbnail" 
            style={{backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
            <input type="file" onChange={e => setThumbnail(e.target.files[0])}/>
            <img src={camera} alt="Select img"/>

            </label>
            
            
            <h4>Descrição</h4>
            <input
            id="description"
            placeholder="Digite algo sobre a foto"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />   
            <div className="pichandler-btns">
                <button type="submit" className="btn">Salvar</button>
                <button type="submit" className="btn" onClick={(e) => reset(e)} >Limpar Campos</button>
            </div>     
            

        </form>     
        </>
    
    )
}