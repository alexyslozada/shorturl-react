import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./contexts/authContext";

//este un comentario de una sola linea
import "./middlewares/axios"
import Router from "./Router"

import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>,
);
