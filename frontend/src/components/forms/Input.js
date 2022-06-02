import React, { useEffect } from "react";

let styleError = {
  fontWeight: "bold",
  color: "#dc3545",
};

let styleImage = {
  height: "10em",
  width: "auto ",
};

const Err = ({ err }) => {
  useEffect(() => { }, [err]);

  return <p style={styleError}>{err}</p>;
};

const isObject = (val) => {
  return val instanceof Object;
}

// https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657
export const ImagePaste = ({
  value,
  form,
  setForm,
  required,
  disabled,
  name,
  id,
  classNameInput,
  classNameDiv,
  label,
  route,
  err,
}) => {

  // https://www.kindacode.com/article/react-typescript-handle-oncopy-oncut-and-onpaste-events/
  const handleChange = async (e) => {
    var item = e.clipboardData.items[0];
    if (item.type.indexOf("image") === 0) {
      let { name } = e.target;
      setForm({
        ...form,
        [name]: item.getAsFile(),
      });
    } else {
      alert("Solo se aceptan imágenes");
    }
  };

  const removeFile = (idName) => {
    setForm({
      ...form,
      [idName]: "",
    });
  };

  return (
    <div className={classNameDiv}>
      <div className="row">
        <label className="">{label}</label>
        {value && (
          <div className="col-12 text-center">
            <img
              alt="not fount"
              style={styleImage}
              src={isObject(value) ? URL.createObjectURL(value) : `${route}/${value}`}
            // src={isEdit ? `${route}/${value}` : URL.createObjectURL(value)}
            />
          </div>
        )}
        <div className="col-9 mt-2">
          <input
            type="text"
            className={classNameInput}
            id={id}
            value={value}
            name={name}
            onPaste={handleChange}
            required={required === 'true' || required ? true : false}
            disabled={disabled}
            placeholder="Pegar Imagen Ctrl + V"
          />
        </div>
        {value && (
          <div className="col-3 mt-2">
            <button
              className="btn btn-danger"
              disabled={disabled}
              onClick={() => removeFile(name)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <Err err={err} />
    </div>
  );
};

export const Image = ({
  value,
  form,
  setForm,
  required,
  disabled,
  name,
  id,
  classNameInput,
  classNameDiv,
  label,
  route,
  isEdit,
  err,
}) => {
  const handleChange = (e) => {
    let { name } = e.target;
    setForm({
      ...form,
      [name]: e.target.files[0],
    });
  };

  const removeFile = (idName) => {
    setForm({
      ...form,
      [idName]: "",
    });
    document.getElementById(idName).value = null;
  };

  return (
    <div className={classNameDiv}>
      <div className="row">
        <label className="">{label}</label>
        {value && (
          <div className="col-12 text-center">
            <img
              alt="not fount"
              style={styleImage}
              src={isEdit ? `${route}/${value}` : URL.createObjectURL(value)}
            />
          </div>
        )}
        <div className="col-9 mt-2">
          <input
            type="file"
            className={classNameInput}
            id={id}
            name={name}
            onChange={handleChange}
            required={required}
            disabled={disabled}
          />
        </div>
        {value && (
          <div className="col-3 mt-2">
            <button
              className="btn btn-danger"
              disabled={isEdit ? true : false}
              onClick={() => removeFile(id)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <Err err={err} />
    </div>
  );
};

export const Input = ({
  label,
  type,
  name,
  err,
  value,
  classNameDiv,
  classNameInput,
  required,
  onChange,
  onBlur,
  onKeyUp,
  classNameLabel,
  maxLength,
  id,
  disabled,
  placeholder,
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <input
        value={value}
        className={classNameInput}
        type={type}
        name={name}
        required={required === "true" || required ? true : false}
        disabled={disabled === "true" || disabled ? true : false}
        onChange={onChange}
        maxLength={maxLength}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        id={id}
        placeholder={placeholder}
      />
      <Err err={err} />
    </div>
  );
};

export const Select = ({
  items,
  classNameDiv,
  label,
  classNameLabel,
  value,
  name,
  classNameSelect,
  required,
  onChange,
  onBlur,
  onKeyUp,
  id,
  disabled,
  err,
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <select
        value={value}
        className={classNameSelect}
        name={name}
        required={required === "true" || required ? true : false}
        disabled={disabled === "true" || disabled ? true : false}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        id={id}
      >
        <option disabled value="" selected>
          Seleccione
        </option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Err err={err} />
    </div>
  );
};

export const TextArea = ({
  classNameDiv,
  label,
  classNameLabel,
  value,
  name,
  classNameInput,
  type,
  required,
  onChange,
  maxLength,
  onBlur,
  onKeyUp,
  id,
  disabled,
  err,
  placeholder,
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <textarea
        value={value}
        className={classNameInput}
        type={type}
        name={name}
        required={required === "true" || required ? true : false}
        disabled={disabled === "true" || disabled ? true : false}
        onChange={onChange}
        onKeyUp={onKeyUp}
        maxLength={maxLength}
        onBlur={onBlur}
        id={id}
        placeholder={placeholder}
      />
      <Err err={err} />
    </div>
  );
};
