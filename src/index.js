import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';


import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';

import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Login from './pages/login/login';
import Main from './pages/main/main';
import MenuComponents from './components/menu/menu';
import ListListas from './pages/list-lista/lista';
import CadListas from './pages/cad-lista/lista';
import EditListas  from './pages/edit-lista/lista';

const path = createBrowserRouter([
  {
    path: "/",
    element: <MenuComponents> <Main></Main> </MenuComponents>,
  },
  {
    path: "/listas",
    element: <MenuComponents> <ListListas></ListListas> </MenuComponents>,
  },
  {
    path: "/listas/manutencao",
    element: <MenuComponents> <CadListas></CadListas> </MenuComponents>,
  },
  {
    path: "/listas/manutencao/:id",
    element: <MenuComponents> <EditListas ></EditListas > </MenuComponents>,
  },
  {
    path: "/entrar",
    element: <Login></Login>,
  },
  {
    path: "/cadastro",
    element: <h1>Hestia - Cadastro</h1>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={path} />
  </React.StrictMode>
);
