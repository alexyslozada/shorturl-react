import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <header>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <div className="flex space-x-7">
              <div className="flex items-center space-x-1">
                <NavLink to="/" className="font-medium text-gray-500 hover:text-gray-900">Home</NavLink>
                <NavLink to="/create" className="font-medium text-gray-500 hover:text-gray-900">Create</NavLink>
                <NavLink to="/list" className="font-medium text-gray-500 hover:text-gray-900">My shorts</NavLink>
                <button type="button" className="link cursor-pointer">Cerrar sesión</button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
