import { Outlet } from 'react-router-dom';
import Navigation from "./components/elements/Navigation";
import Error from "./components/elements/Error";

import { API_URL, ERR_MISSING_CONFIG } from "./config/configuration";

function App() {
  if (API_URL === "") return <Error data={ERR_MISSING_CONFIG} />

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          className="
          relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32"
        >
          <Navigation />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App;
