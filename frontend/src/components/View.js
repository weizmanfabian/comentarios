import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { deleteRegister } from '../data/api'

const View = ({
  data,
  mostrarForm,
  setRegistro,
  ocultarForm,
  setForm,
  setTitle
}) => {

  const [newData, setNewData] = useState(data);
  const [busqueda, setBusqueda] = useState("");


  useEffect(() => {
    setNewData(data)
  }, [data])

  const deleteReg = async (register) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Va a eliminar el Comentario ${register.nombre}. Desea continuar?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, Eliminar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await deleteRegister('comentarios', 'id', register.id)
        const { msg, err } = await data
        Swal.fire(err ? err : msg)
        ocultarForm()
      }
    })
  }

  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = data.filter((elemento) => {
      if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.pagina_web.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.comentario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setNewData(resultadosBusqueda);
  }

  return (
    <>
      <br />
      <button
        className='btn btn-primary'
        onClick={() => mostrarForm('Agregar Comentario', '')}
      >
        Agregar Comentario</button>
      <br />
      <br />
      <div className="containerInput">
        <input
          className="form-control"
          value={busqueda}
          placeholder="Busqueda personalizada"
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="card">
        <div className="card-body ">
          <h5 className="card-title text-center">Listado de Comentarios</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Website</th>
                <th scope="col">Comentario</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {newData.map((v, i) => (
                <tr key={i}>
                  <td>{v.nombre}</td>
                  <td>{v.email}</td>
                  <td>{v.pagina_web ? v.pagina_web : 'N/D'}</td>
                  <td>{v.comentario}</td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={() => {
                        mostrarForm('Editar Comentario', v)
                      }}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => {
                        deleteReg(v)
                        setRegistro('')
                        setForm(false)
                        setTitle('Listado de Comentarios')
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default View;