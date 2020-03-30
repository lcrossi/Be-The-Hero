import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom'; /*Essa importação faz o link funcionar conforme o React, sem atualizar a pag toda, e todo o conteudo js e html*/
import api from '../../services/api';

import LogoImg from '../../Assets/logo.svg';
import ImgHeroes from '../../Assets/heroes.png';
import {FiLogIn} from  'react-icons/fi';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault(); //fazer para todos os formularios react
        
        try {
            const response = await api.post('sessions', { id });

             localStorage.setItem('ongId', id);  //preciso ter esses dados salvos durante a minha aplicação 
             localStorage.setItem('ongName', response.data.name);
             history.push('/profile');

        } catch (err){ 
            alert('Falha no login, tente novamente.');

        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>

                </form>
            </section>
            <img src={ImgHeroes} alt="Heroes"/>
        </div>
    );
}