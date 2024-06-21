import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const CardListaComponents = ({ id, title, data, quantidade }) => {
    return (
        <div className="card shadow-sm py-2 px-3 mb-3">
            <a href="#" className="card-body list-group-item list-group-item-action border-0">
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <i className="bi bi-journal-text fs-2"></i>
                    <div className="d-flex flex-column w-100 justify-content-between">
                        <h5 className="mb-0 text-truncate">{title}</h5>
                        <small>{data} | {quantidade} Itens</small>
                    </div>
                    <button type="button" className="btn btn-outline-success">
                        <i className="bi bi-piggy-bank fs-5"></i>
                    </button>
                </div>

            </a>
        </div>
    );
};

const CardListaEditComponents = ({ key, id, title, data, quantidade }) => {
    const url = process.env.REACT_APP_URL;
    const deletar = async (id) => {
        Swal.fire({
            title: 'Deseja apagar a lista?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
          }).then(async (result) => {
            if (result.isConfirmed) {
              // Ação a ser executada se o usuário clicar em "Sim"
              const response = await axios.delete(url + 'lista/' + id);
              Swal.fire({
                icon: 'success',
                title: 'Lista deletada com sucesso!',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirecionar para a página /lista
                window.location.href = '/listas';
            });
              // Aqui você pode adicionar a lógica para apagar a lista.
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // Ação a ser executada se o usuário clicar em "Não"
            }
          });       
    };

    const editar = async (id) => {
        window.location.href = '/listas/manutencao/' + id;
    };

    return (
        <div key={key} className="card shadow-sm py-2 px-3 mb-3">
            <a href="#" className="card-body list-group-item list-group-item-action border-0">
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <i className="bi bi-journal-text fs-2"></i>
                    <div className="d-flex flex-column w-100 justify-content-between">
                        <h5 className="mb-0 text-truncate">{title}</h5>
                        {/* <small>{data} | {quantidade} Itens</small> */}
                        <small>{quantidade} Itens</small>

                    </div>
                    <button type="button" className="btn btn-outline-success">
                        <i className="bi bi-piggy-bank fs-5"></i>
                    </button>
                    <button type="button" className="btn btn-outline-warning" onClick={() => editar(id)}>
                        <i className="bi bi-pencil-square fs-5"></i>
                    </button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => deletar(id)}>
                        <i className="bi bi-trash fs-5"></i>
                    </button>
                </div>

            </a>
        </div>
    );
};

export { CardListaComponents, CardListaEditComponents };

