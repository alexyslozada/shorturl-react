/* eslint-disable */
import { createContext, useEffect, useState } from "react"
import Axios from "axios"

const PATH = "/v1/login";
const TOKEN_KEY = "token"

export const AuthContext = createContext({ isLogged: {isAuth: false} })

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState({ isAuth: false })

  useEffect(() => {
    // We are assuming that if we have a token then we are authenticated
    if (!!localStorage.getItem(TOKEN_KEY)) {
      setIsLogged({isAuth: true})
    }
  }, [])

  const login = async (user) => {
    const response = {}
    try {
      const resp = await Axios.post(`${PATH}`, user)
      response.status = resp.status

      // Set token as default authorization in all request
      localStorage.setItem(TOKEN_KEY, resp.data.data)
      Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY)}`
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
    localStorage.removeItem(TOKEN_KEY)
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
