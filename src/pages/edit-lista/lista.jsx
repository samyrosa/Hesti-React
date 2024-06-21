import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponents from '../../components/header/header';
import axios from 'axios';
import Swal from 'sweetalert2'


const EditListas = () => {
  const { id } = useParams();
  const url = process.env.REACT_APP_URL;
  const [listaData, setListaData] = useState({ name: '', products: [] });
  useEffect(() => {
    const fetchListaData = async () => {
      try {
        const response = await axios.get(url + 'lista/' + id);
        console.log(response.data);
        setListaData(response.data[0]);
      } catch (error) {
        console.error('Erro ao buscar dados da lista:', error);
      }
    };
    fetchListaData();
  }, [id]);

  const salvar = (idList) => {

  };

  const ApagarPro = async (productId) => {
    Swal.fire({
        title: 'Deseja apagar o produto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Ação a ser executada se o usuário clicar em "Sim"
          const response = await axios.delete(url + 'lista/' + id + '/' + productId);
          Swal.fire({
            icon: 'success',
            title: 'Lista deletada com sucesso!',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redirecionar para a página /lista
            window.location.href = '/listas/manutencao/' + id;
        });
          // Aqui você pode adicionar a lógica para apagar a lista.
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Ação a ser executada se o usuário clicar em "Não"
        }
      });       
};

  const Cancelar = () => {
    // Atualiza o estado dos produtos selecionados
    window.location.href = '/listas';
  };

  return (
    <div>
      <HeaderComponents title="Editar Lista!" subtitle="Fique à vontade para mudar o que desejar" />
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-lg-12">
              <label htmlFor="nome">Nome da lista</label>
              <input type="text" className="form-control" name="name" id="name" value={listaData.name} />
            </div>
          </div>
          <hr />
          <table className="table table-striped table-hover mt-2">  
            <tbody>
              {listaData.products.map((item) => (
                <tr key={item.productId}>
                  <td className='fw-normal'>{item.name}</td>
                  <td className='fw-light'>{item.description}</td>
                  <td className='fw-light'><a className='text-danger' onClick={() => ApagarPro(item.productId)}><i className="bi bi-trash fs-5"></i></a></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-outline-secondary" onClick={Cancelar}>Cancelar</button>
            <button type="button" className="btn btn-success ms-3 px-4" onClick={(salvar(id))}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditListas;