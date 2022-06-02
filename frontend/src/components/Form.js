import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { Input, TextArea } from './forms/Input';
import expresiones from '../helpers/expresionesRegulares'
import { searchBy } from '../data/api'
import Swal from 'sweetalert2';

//parametros

// value= valor a validar
// expresionesRegulares= [array de expresiones regulares]
// messages= [array de mensajes que quiere imprimir]. Para tener en cuenta que debe coincidir la posición con el array de expresiones
const validateErr = (
  value,
  expresionesRegulares,
  messages
) => {
  let res = '';
  expresionesRegulares.map(
    (ex, index) => {
      res = !ex.test(value.trim()) ? messages[index] : res
    }
  )
  if (!value.trim()) {
    res = "Campo requerido"
  }
  return res
}

const validationsForm = (form) => {
  let errors = {};

  const { soloLetras, correo } = expresiones

  let enombre = validateErr(
    form.nombre,
    [soloLetras],
    ["Sólo se aceptan letras"]
  )
  if (enombre) {
    errors.nombre = enombre
  }

  let eemail = validateErr(
    form.email,
    [correo],
    ["Formato de correo incorrecto"]
  )
  if (eemail) {
    errors.email = eemail
  }

  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  if (!regex.test(form.pagina_web) && form.pagina_web.length > 0) {
    errors.pagina_web = 'Url Inválida'
  }

  let ecomentario = validateErr(
    form.comentario,
    [soloLetras],
    ["Sólo se aceptan letras"]
  )

  if (ecomentario) {
    errors.comentario = ecomentario
  }

  return errors;
}

const Form = ({
  registro,
  title,
  handleForm
}) => {

  const initialForm = {
    nombre: '',
    email: '',
    pagina_web: '',
    comentario: ''
  }

  const {
    form,
    setForm,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialForm, validationsForm, 'comentarios')

  const consultarCorreoDuplicado = async (correo) => {
    const { data } = await searchBy('comentarios', 'email', correo)
    const { rows } = await data
    return rows.length > 0 ? true : false
  }

  const submit = async (e) => {
    e.preventDefault()

    if (consultarCorreoDuplicado(form.email) && !registro) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Solo se puede hacer un comentario por correo',
        showConfirmButton: true,
        toast: true,
        timerProgressBar: true,
      })
    } else {

      handleSubmit(
        e,
        registro ? 'update' : 'create',
        form,
        'id',
        form.id,
        () => handleForm(false)
      )

    }

  }

  const handleRegistro = async () => {
    if (registro) {
      setForm({
        id: registro.id,
        nombre: registro.nombre,
        email: registro.email,
        pagina_web: registro.pagina_web,
        comentario: registro.comentario
      })
    } else {
      setForm(initialForm)
    }
  }

  useEffect(() => {
    handleRegistro()
  }, [registro])

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">{title}</h5>
        <form onSubmit={submit}>
          <div className='row'>
            <Input
              classNameDiv="col-12"
              label="Nombre"
              classNameInput="form-control"
              type="text"
              maxLength="35"
              required="true"
              onBlur={handleBlur}
              onKeyUp={handleBlur}
              onChange={handleChange}
              name="nombre"
              value={form.nombre}
              err={errors.nombre}
            />
            <Input
              classNameDiv="col-12"
              label="Correo Electrónico"
              classNameInput="form-control"
              type="email"
              required="true"
              onBlur={handleBlur}
              onKeyUp={handleBlur}
              onChange={handleChange}
              name="email"
              value={form.email}
              err={errors.email}
            />
            <Input
              classNameDiv="col-12"
              label="Página Web"
              classNameInput="form-control"
              type="text"
              onBlur={handleBlur}
              onKeyUp={handleBlur}
              onChange={handleChange}
              name="pagina_web"
              value={form.pagina_web}
              err={errors.pagina_web}
            />
            <TextArea
              classNameDiv="col-12"
              label="Contenido"
              classNameInput="form-control"
              type="text"
              onBlur={handleBlur}
              onKeyUp={handleBlur}
              onChange={handleChange}
              name="comentario"
              value={form.comentario}
              err={errors.comentario}
            />
            <button type='submit' className={`btn btn-success`}>{registro ? 'Editar' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;