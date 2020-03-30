import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import LogoImg from '../../Assets/logo.svg';


export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();  // para apos o cadastro levar para outra pag, tem continuação abaixo...


    async function handleRegister(e){  //responsavel por fazer o cadastro do usuario
        e.preventDefault(); //impede a atualização automatica da pagina ao clicar no btn

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        
        try{
            const response = await api.post('ongs', data); //eh a rota e os dados que se quer enviar
            alert(`Seu ID  de acesso: ${response.data.id}`); //template string (var dentro do texto)
            history.push('/'); //apos feito o login manda para o inicio
        } catch(err){
            alert('Erro no cadastro, tente novamente.');
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />

                    <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <input placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />

                        <input placeholder="UF" 
                        style={{width: 80}} 
                        value={uf}
                        onChange={e => setUf(e.target.value)} /*primeira chaves -> inserção de codigo JS, segunda chaves -> inserção de objeto JS*/
                        />  
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}