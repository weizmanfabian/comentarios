import axios from 'axios';

export const urlServer = "http://localhost:9000"

export const getAllCommentarios = async (tabla) => {
  try {
    const res = await axios.get(`${urlServer}/server/getAll/${tabla}`)
    return res
  } catch (err) {
    console.log(`err call getAllCommentarios in api ${err}`);
  }
}

export const postServer = async (tabla, form, actionServer, name, value) => {
  try {
    const res = await actionServer === 'create'
      ? axios.post(`${urlServer}/server/${actionServer}/${tabla}`, form)
      : axios.put(`${urlServer}/server/${actionServer}/${tabla}/${name}/${value}`, form)
    return res
  } catch (err) {
    console.log(`err call postServer in api ${err}`);
  }
}

export const deleteRegister = async (tabla, name, id) => {
  try {
    const res = await axios.delete(`${urlServer}/server/delete/${tabla}/${name}/${id}`)
    return res
  } catch (err) {
    console.log(`err call deleteRegister in api ${err}`);
  }
}

export const searchBy = async (tabla, name, id) => {
  try {
    const res = await axios.get(`${urlServer}/server/searchBy/${tabla}/${name}/${id}`)
    return res
  } catch (err) {
    console.log(`err call searchBy in api ${err}`);
  }
}

export const getVersion = async () => {
  try {
    const res = await axios.get(`${urlServer}/getVersion`)
    return res
  } catch (err) {
    console.log(`err call searchBy in api ${err}`);
  }
}