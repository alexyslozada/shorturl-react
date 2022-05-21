import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Axios from "axios"

function Navigation() {
  const [isLogout, setIsLogout] = useState(false)

  const logout = async () => {
    // TODO make a request to backend to invalidate token
    Axios.defaults.headers.common.Authorization = ""
    setIsLogout(true)
  }

  if (isLogout) {
    // TODO navigate without lost the menu
    setIsLogout(false)
    return <Navigate to="/" />
  }

  return (
    <header>
      <div>
        <div className="bg-gray-100">
          <nav className="
              container
              px-6
              py-8
              mx-auto
              md:flex md:justify-between md:items-center
            "
          >
            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className="
                text-xl
                font-bold
                text-gray-800
                md:text-2xl
                hover:text-blue-400
                "
              >
                Home
              </NavLink>
            </div>
            <ul
              className="
                flex-col
                mt-8
                space-y-4
                md:flex
                md:space-y-0
                md:flex-row
                md:items-center
                md:space-x-10
                md:mt-0
              "
            >
              <li className="text-sm font-bold text-gray-800 hover:text-blue-400">
                <NavLink to="/create">Create</NavLink>
              </li>
              <li className="text-sm font-bold text-gray-800 hover:text-blue-400">
                <NavLink to="/list">My shorts</NavLink>
              </li>
              <li className="text-sm font-bold text-gray-800 hover:text-blue-400">
                <button type="button" onClick={logout}>Cerrar sesión</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navigation
