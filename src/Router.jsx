import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

import App from "./App";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ListShorts from "./components/pages/ListShorts";
import Create from "./components/pages/Create";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isAuth, redirectPath = '/login' }) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

const Router = () => {
  const { isLogged } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute isAuth={isLogged.isAuth} />}>
            <Route path="list" element={<ListShorts />} />
            <Route path="create" element={<Create />} />
          </Route>
          <Route path="*" element={<p>Oh oh, there is nothing here! 404.</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
