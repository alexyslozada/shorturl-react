import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ListShorts from "./components/pages/ListShorts";
import Create from "./components/pages/Create";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="list" element={<ListShorts />} />
        <Route path="create" element={<Create />} />
        <Route path="*" element={<p>Oh oh, there is nothing here! 404.</p>} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Router
