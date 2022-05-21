import Axios from "axios"

import { API_URL } from "../config/configuration";

const PATH = "/v1/login";

const useAuth = () => {
  const response = {}

  const login = async (user) => {
    try {
      const resp = await Axios.post(`${API_URL}${PATH}`, user)
      response.status = resp.status

      // Set token as default authorization in all request
      Axios.defaults.headers.common.Authorization = `Bearer ${resp.data.data}`
    } catch (err) {
      response.status = err.response.status
      response.data = err.response.data
    }

    return response
  }

  return { login }
}

export default useAuth
