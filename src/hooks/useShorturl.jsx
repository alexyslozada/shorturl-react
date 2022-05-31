import Axios from "axios"

const PATH = "/v1/short-urls";

const useShortURL = () => {
  const response = {}

  const createShortURL = async (short) => {
    try {
      const action = await Axios.post(`${PATH}`, short)
      response.status = action.status
      response.data = action.data.data

      return response
    } catch (err) {
      response.status = err.response.status
      response.data = err.response.data

      return response
    }
  }

  const deleteShortURL = async (id) => {
    try {
      const action = await Axios.delete(`${PATH}/id/${id}`)
      response.status = action.status

      return response
    } catch (err) {
      response.status = err.response.status
      response.data = err.response.data

      return response
    }
  }

  return { createShortURL, deleteShortURL }
}

export default useShortURL
