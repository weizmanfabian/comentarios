import { useState } from "react";
import Swal from "sweetalert2";
import { postServer } from "../data/api";

export const useForm = (initialForm, validateForm, table) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e, funcion) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    if (funcion) {
      funcion();
    }
  };

  const handleBlur = (e, funcion) => {
    handleChange(e, () => { });
    setErrors(validateForm(form));
    if (funcion) {
      funcion();
    }
  };

  // si no hay funcion enviar 0
  // * e  e button
  // * actionServer  actionServer: create - update
  // * newForm: objeto a guardar
  // * name  name: Al editar el nombre del campo en la base de datos
  // * value  value: Al editar el vale en la base de datos
  //  actionPost  actionPost: funcion execute after send post
  const handleSubmit = async (
    e,
    actionServer,
    newForm,
    name,
    value,
    actionPost,
  ) => {
    e.preventDefault();

    let errResult = await validateForm(newForm);

    if (Object.keys(errResult).length === 0) {
      try {


        const { data } = await postServer(table, newForm, actionServer, name, value)
        const { err, msg } = await data;
        if (err) {
          Swal.fire(err);
          return;
        } else {
          e.target.reset();
          Swal.fire(msg);
          setForm(initialForm);
          if (actionPost) {
            actionPost();
          }
        }
      } catch (err) {
        console.log(
          `Ocurrió un error al realizar el post del hook useForm handleSubmitGetObject: ${actionServer} ${table} Err: ${err}`
        );
      }
    } else {
      // e.preventDefault();
      return false;
    }
  };

  return {
    form,
    setForm,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  };
};
