import React, { useState, useEffect } from 'react';
import HeaderComponents from '../../components/header/header';
import { CardListaComponents, CardListaEditComponents } from '../../components/card-lista/cardLista';
import axios from 'axios';
import Swal from 'sweetalert2'

const CadListas = () => {

    const url = process.env.REACT_APP_URL;
    const [listaData, setListaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState('2024-04-19');
    const [selectedProducts, setSelectedProducts] = useState([])

    useEffect(() => {
        const fetchListaData = async () => {
            try {
                const response = await axios.get(url + 'products');
                setListaData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados da lista:', error);
            }
        };
        fetchListaData();
    }, []);

    const  filterList = () => {
        const updatedList = listaData.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        }).slice(0, 8); // Limitando para 3 itens
        return updatedList;
    };

    const handlePost = async () => {
        try {
            const requestData = {
                name, // Assuming 'name' is already defined
                data, // Assuming 'data' is already defined
                products: selectedProducts.map((productId) => ({
                    productId
                }))
                 // The array of objects with 'productId' property
            };

            const response = await axios.post(url + 'lista', requestData);
            
            
            Swal.fire({
                icon: 'success',
                title: 'Salvo com sucesso!',
                text: 'Lista ' + name + ' salva com sucesso',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirecionar para a página /lista
                window.location.href = '/listas';
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar!',
                text: 'Ocorreu um problema ao enviar os dados. Por favor, tente novamente mais tarde.',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleCheckboxChange = (productId) => {
        // Atualiza o estado dos produtos selecionados
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const Cancelar = () => {
        // Atualiza o estado dos produtos selecionados
        window.location.href = '/listas';
    };


    return (
        <div>
            <HeaderComponents title="Cadastro de lista!" subtitle="Pensando em econimizar? Então bora criar sua lista " />
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <label htmlFor="nome">Nome da lista</label>
                            <input type="text" className="form-control" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="pesquisa">Pesquisa de Produtos</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="pesquisa" id="pesquisa" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                                <button className="btn btn-outline-secondary" type="button" id="Pesquisa"><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <label className='fw-bold'>Algumas opções:</label>
                        </div>
                        {/* <div className="col-12 col-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-sm" name="pesquisa" id="pesquisa" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                                <button className="btn btn-sm btn-outline-secondary" type="button" id="Pesquisa"><i className="bi bi-search"></i></button>
                            </div>
                        </div> */}
                    </div>
                    <table className="table table-striped table-hover mt-2">
                        <tbody>
                            {listaData.length > 0 && filterList().map((item) => (
                                <tr key={item.productId}>
                                    <td><input type="checkbox" value={item.productId} checked={selectedProducts.includes(item.productId)}
                                        onChange={() => handleCheckboxChange(item.productId)} /></td>
                                    <td className='fw-normal'>{item.name}</td>
                                    <td className='fw-light'>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary" onClick={Cancelar}>Cancelar</button>
                        <button type="button" className="btn btn-success ms-3 px-4" onClick={handlePost}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadListas;