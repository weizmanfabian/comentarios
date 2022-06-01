import axios from 'axios';

export const urlServer = "http://localhost:9000"

export const getAllCommentarios = async (tabla) => {
  try {
    const res = await axios.get(`${urlServer}/server/getAll/${tabla}`)
    return res
  } catch (err) {
    console.log(`err call login in api ${err}`);
  }
}