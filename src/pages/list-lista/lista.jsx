import React, { useState, useEffect } from 'react';
import HeaderComponents from '../../components/header/header';
import { CardListaComponents, CardListaEditComponents } from '../../components/card-lista/cardLista';
import axios from 'axios';

const ListListas = () => {
    const url = process.env.REACT_APP_URL;
    const [listaData, setListaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchListaData = async () => {
            try {
                const response = await axios.get(url + 'lista');
                setListaData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados da lista:', error);
            }
        };
        fetchListaData();
    }, []);

    const filterList = () => {
        const updatedList = listaData.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return updatedList;
    };

    const CadastrarLista = () => (
        window.location.href = '/listas/manutencao'

    );

    return (
        <div>
            <HeaderComponents title="Listas!" subtitle="Compare os preços e economize ! " />
            <div className="card mb-3">
                <div className="card-body">
                <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control" name="text" id="text" onChange={e => setSearchTerm(e.target.value)}
                                    value={searchTerm} />
                                <button className="btn btn-outline-secondary" type="button" id="Pesquisa"><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6  d-flex justify-content-end">
                            <button type="button" className="btn btn-success" onClick={CadastrarLista}>
                                <i className="bi bi-plus"></i> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <CardListaEditComponents id="121" title="Teste Nome Lista" data="00/00/00" quantidade="2"></CardListaEditComponents> */}
            {listaData.length > 0 && filterList().map((item) => (
                <CardListaEditComponents
                    key={item.listaId}
                    id={item.listaId}
                    title={item.name}
                    data={item.data}
                    quantidade={item.products.length}
                />
            ))}

        </div>
    );
}

export default ListListas;