import React, { useEffect } from 'react';

const View = ({ data, updateTitle }) => {

  useEffect(() => {
    updateTitle('Listado de Comentarios')
  })

  return (
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
        {data.map((v, i) => (
          <tr key={i}>
            <td>{v.nombre}</td>
            <td>{v.email}</td>
            <td>{v.pagina_web}</td>
            <td>{v.comentario}</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
}

export default View;