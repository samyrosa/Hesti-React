import React, { useState } from 'react';
import { useHistory  } from 'react-router-dom';

import './login.css'; 
import hestia_logo_verde from '../../assets/image/hestia_logo_verde.png';
import hestia_login_person from '../../assets/image/hestia_login_person.png';

const Login = () => {
    function  Entrar(event) {  
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const senha = formData.get('senha');

        //API

        localStorage.setItem('id', 1);
        localStorage.setItem('nome', 'Pedro');
        localStorage.setItem('email', email);
        window.location.href = '/';
    
    };

    return (
            <div className="h-100 d-flex ">
                <div id="card_form" className="d-flex flex-column justify-content-center p-5 gap-4">
                    <div className="d-flex flex-column">
                        <h1><img src={hestia_logo_verde} alt="Logo da Hestia" /></h1>
                        <h3 className="fw-bold">BEM-VINDO!</h3>
                        <p>Faça login para continuar.</p>
                        <hr className="m-0" />
                    </div>
                    <form onSubmit={Entrar} className="d-flex flex-column pb-4 gap-2">
                        <div>
                            <label className="fw-bold" htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" id="email" />
                        </div>
                        <div>
                            <label className="fw-bold" htmlFor="senha">Senha</label>
                            <input type="password" className="form-control" name="senha" id="senha" />
                        </div>

                        <a href="#" className="link-dark fw-bold ">Esqueceu a senha?</a>

                        <button className="btn btn-dark" type="submit">Entrar</button>
                    </form>
                    <div className="d-flex flex-column gap-1">
                        <a href="#" className="link-dark fw-light">Não tem uma conta ainda?</a>
                        <a href="#" className="link-dark fw-light">Deseja cadastrar seu negocio?</a>
                    </div>
                </div>
                <div id="card_span" className="d-flex flex-column justify-content-end align-items-center w-100  px-5 pt-5">
                    <img src={hestia_login_person} className="w-50s"
                        alt="Ilustração de uma pessoa com frutas e verduras a se rodear"/>
                </div>
            </div>
    );
}

export default Login;