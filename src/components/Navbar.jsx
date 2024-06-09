import React, { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login')
  };

  return (
    <div className="flex bg-blue-950 px-4 justify-between ml-64">
      <div className="flex items-center text-xl"></div>

      <div className="bg-white mt-4 mb-4 rounded-lg">
        <div className="flex md:w-64 items-center justify-center">
          <span></span>
          <input
            type="text"
            placeholder="search anything....."
            className="w-full px-4 py-1 pl-12 rounded-lg shadow outline-none hidden md:block"
          />
          <button className="focus:outline-none mt-2 text-white md:text-black bg-white py-1 rounded-lg px-4">
            <Icon icon="iconoir:search" height={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-x-5">
        {/** space for notifications icons */}
        <div>
          <Icon
            icon="ion:notifications-outline"
            height={30}
            className="text-white"
          />
        </div>

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
    </div>
  );
}

export default Navbar;
