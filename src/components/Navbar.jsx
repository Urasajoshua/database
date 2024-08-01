import React, { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex bg-blue-950 px-4 justify-between items-center">
      {/* Hamburger button */}
      {/* <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          <Icon icon="mdi:menu" height={30} />
        </button>
      </div> */}
      <div></div>

      {/* Logo and navigation */}
      <div className="hidden md:flex items-center text-xl ml-64">
        {/* Add your logo or brand name here */}
      </div>

      <div className="flex items-center gap-x-5">
        {/* Space for notifications icons */}
        <div>
          <Icon
            icon="ion:notifications-outline"
            height={30}
            className="text-white"
          />
        </div>

        {/* User menu */}
        <div className="relative">
          <button className="text-white group">
            <Icon icon="ion:person-sharp" height={35} />
            <div className="z-10 hidden bg-white absolute rounded-lg shadow w-32 group-focus:block top-full right-0">
              <ul className="py-2 text-sm text-gray-950 space-y-4">
                <li>
                  <a>{user ? user.firstname : 'Profile'}</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {/* <div className={`absolute top-0 left-0 w-full bg-blue-950 transition-transform transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex flex-col items-center mt-12 space-y-6">
          <Icon
            icon="ion:notifications-outline"
            height={30}
            className="text-white"
          />
          <div className="relative">
            <button className="text-white group">
              <Icon icon="ion:person-sharp" height={35} />
              <div className="z-10 hidden bg-white absolute rounded-lg shadow w-32 group-focus:block top-full right-0">
                <ul className="py-2 text-sm text-gray-950 space-y-4">
                  <li>
                    <a>{user ? user.firstname : 'Profile'}</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Navbar;
