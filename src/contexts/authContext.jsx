/* eslint-disable */
import { createContext, useState } from "react"
import Axios from "axios"

const PATH = "/v1/login";

export const AuthContext = createContext({ isAuth: false })

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState({ isAuth: false })

  const login = async (user) => {
    const response = {}
    try {
      const resp = await Axios.post(`${PATH}`, user)
      response.status = resp.status

      // Set token as default authorization in all request
      Axios.defaults.headers.common.Authorization = `Bearer ${resp.data.data}`
      setIsLogged({isAuth: true})
    } catch (err) {
      console.log(err)
      response.status = err?.response?.status
      response.data = err?.response?.data
      setIsLogged({isAuth: false})
    }

    return response
  }

  const logout = () => {
    Axios.defaults.headers.common.Authorization = ""
    setIsLogged({isAuth: false})
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
