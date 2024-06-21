import React from 'react';
import './menu.css'; 

import hestia_logo_verde from '../../assets/image/hestia_logo_verde.png';


const MenuComponents = ({ children }) => {
    function UsuarioLogado() {
        const email = localStorage.getItem('email');
        if (email === null || email.trim() === '') {
            window.location.href = '/entrar';
        };
    };

    UsuarioLogado();
    const SairDoSistema = () => (
        localStorage.clear(),
        window.location.href = '/entrar'

    );
    return (
        <div className="row h-100 g-0">
            <div id="" className="col-1 col-lg-2 bg-white text-dark h-100">
                <div className="d-flex flex-column justify-content-between h-100">
                    <header className="d-flex flex-column align-items-center px-3 pt-3">
                        {/* <h1 className="d-none d-lg-inline">Hestia</h1> */}
                        <h1><img src={hestia_logo_verde} alt="Logo da Hestia" className="d-none d-lg-inline" width={180}/></h1>
                        <nav className="nav flex-column w-100 mt-3">
                            <a className="nav-link link-dark px-0" aria-current="page" href='/'>
                                <i className="bi bi-house"></i>
                                <span className="d-none d-lg-inline ms-2">Inicio</span>
                            </a>
                            <a className="nav-link link-dark px-0" aria-current="page" href='./'>
                                <i className="bi bi-search"></i>
                                <span className="d-none d-lg-inline ms-2">Explorar</span>
                            </a>
                            <a className="nav-link link-dark px-0" aria-current="page" href='/listas'>
                                <i className="bi bi-list-check"></i>
                                <span className="d-none d-lg-inline ms-2">Listas</span>
                            </a>
                            <a className="nav-link link-dark px-0" aria-current="page" href='./'>
                                <i className="bi bi-person"></i>
                                <span className="d-none d-lg-inline ms-2">Meu Perfil</span>
                            </a>
                        </nav>
                    </header>
                    <footer className="px-3 pb-3">
                        <button type="button" className="btn btn-sm btn-outline-dark w-100" onClick={SairDoSistema}>
                            <i className="bi bi-x-circle"></i>
                            <span className="d-none d-lg-inline px-2">Sair</span>
                        </button>
                    </footer>
                </div>
            </div>
            <main className="col h-100 bg-light overflow-auto d-flex flex-column bg-light px-3 py-2">
                {children}
            </main>
        </div>
    );
}

export default MenuComponents;