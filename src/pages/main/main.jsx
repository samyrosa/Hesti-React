import React, { useState, useEffect } from 'react';
import HeaderComponents from '../../components/header/header';
import { CardListaComponents, CardListaEditComponents } from '../../components/card-lista/cardLista';
import baner_img from '../../assets/image/imgBanner.png';
import axios from 'axios';

const Main = () => {
    const url = process.env.REACT_APP_URL;
    const [listaData, setListaData] = useState([]);
    useEffect(() => {
        const fetchListaData = async () => {
            try {
                const response = await axios.get(url + 'lista');
                setListaData(response.data.slice(0, 3));
            } catch (error) {
                console.error('Erro ao buscar dados da lista:', error);
            }
        };
        fetchListaData();
    }, []);
    return (
        <>
            <HeaderComponents title="Bem - Vindo!" subtitle="Site para comparação de preços" />
            <div id="CardCriaLista" className="card shadow">
                <div className="">
                    <div className="d-flex">
                        <div className="p-5 text-start rounded-3 card-body">
                            <h1 className="text-body-emphasis">Vamos Comprar?</h1>
                            <p className="col-lg-8 text-body-emphasis fs-4">
                                Crie sua a lista e vamos organizar
                            </p>
                            <button type="button" className="btn btn-outline-dark">Criar uma lista</button>
                        </div>
                        <img src={baner_img} alt="" height="" />
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-12 col-lg-6">
                    <h3 className="fs-4">Minhas Listas</h3>
                    <div className="row g-2">
                        <div className="col-12">
                            {/* <CardListaComponents id="121" title="Teste Nome Lista" data="00/00/00" quantidade="2"></CardListaComponents> */}
                            {listaData.length > 0 && listaData.map((item) => (
                                <CardListaComponents
                                    key={item.i}
                                    id={item.name}
                                    title={item.name}
                                    data={item.data}
                                    quantidade={item.products.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;