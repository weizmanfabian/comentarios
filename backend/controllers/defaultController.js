import msg from "./msgController.js"

import conn from '../database/conexion.js'

//----------------create----------------
//parametros
//tabla: para saber cual tabla afectará
//body: todo el objeto que quiere insertar
export const create = (req, res) => {
  try {
    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [req.body],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + " added!"
        );
        res.json(err ? { err: msg.errCreate } : { msg: msg.create });
      }
    );
  } catch (err) {
    console.log(`Ocurrión un error create ${err}`);
  }
};

//----------------delete----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del id o campo en la base de datos
//value: valor del campo a eliminar ej(123)
export const deleteRegister = (req, res) => {
  try {
    conn.query(
      "DELETE FROM " + req.params.tabla + " WHERE " + req.params.name + " = ?",
      [req.params.value],
      (err, rows) => {
        console.log(
          err
            ? "Error DELETE FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " " +
            err
            : req.params.tabla +
            "." +
            req.params.name +
            " = " +
            req.params.value +
            " remove successfull!"
        );
        res.json(err ? { err: msg.errDelete } : { msg: msg.delete });
      }
    );
  } catch (err) {
    console.log(`Ocurrión un error deleteRegister ${err}`);
  }
};

//----------------searchBy consulta por un valor en especifico----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del campo a consultar en la base de datos
//value: valor del campo a consultar ej(123)
export const searchBy = (req, res) => {
  try {
    conn.query(
      "SELECT * FROM " +
      req.params.tabla +
      " WHERE " +
      req.params.name +
      " = ?",
      [req.params.value],
      (err, rows) => {
        console.log(
          err
            ? "Err SELECT * FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " " +
            err
            : "SELECT * FROM " +
            req.params.tabla +
            " WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " results: " +
            rows.length
        );
        msg.get.title = err
          ? "Ha ocurrido un error al consultar los datos."
          : rows.length == 0
            ? "Sin resultados"
            : rows.length == 1
              ? rows.length + " resultado"
              : rows.length + " resultados";

        msg.get.icon = err ? "error" : "info";

        res.json(err ? { err: msg.get } : { rows: rows, msg: msg.get });
      }
    );
  } catch (err) {
    console.log(`Ocurrión un error searchBy ${err}`);
  }
};


//----------------Update----------------
//parametros
//tabla: para saber cual tabla afectará
//name: nombre del id o campo en la base de datos
//value: valor del campo a eliminar ej(123)
//body: todo el objeto nuevo a actualizar
export const update = (req, res) => {
  try {
    conn.query(
      "UPDATE " + req.params.tabla + " set ? WHERE " + req.params.name + " = ?",
      [req.body, req.params.value],
      (err, rows) => {
        console.log(
          err
            ? "Err UPDATE " +
            req.params.tabla +
            " set ? WHERE " +
            req.params.name +
            " = " +
            req.params.value +
            " " +
            err
            : req.params.tabla + " Update!"
        );
        res.json(err ? { err: msg.errUpdate } : { msg: msg.update });
      }
    );
  } catch (err) {
    console.log(`Ocurrión un error update ${err}`);
  }
};

export const getAll = (req, res) => {
  try {
    let { tabla } = req.params
    conn.query(`SELECT * FROM ${tabla}`, (err, result) => {
      console.log(err
        ? `Err getAll ${err}`
        : `getAll results: ${result.length}`);
      res.json(err
        ? { msg: 'Ocurrió un error al consultar los datos' }
        : { rows: result, msg: !result ? 'Sin resultados' : result.length == 1 ? '1 resultados' : `${result.length} resultados` })
    })
  } catch (err) {
    console.log(`Ocurrión un error getAll ${err}`);
  }
}