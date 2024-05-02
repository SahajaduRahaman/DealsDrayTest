import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/ContextApi";
import { NavLink } from "react-router-dom";
import { GetAdminApi } from "../fetchApi/FetchAPI";

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);

  const [admin, setAdmin] = useState({});

  useEffect(() => {
    GetAdminApi().then((data) => {
      if (data.status === 200) {
        setAdmin(data.data.admin);
      } else {
        console.log(data);
      }
    });
  }, []);

  const HandleClick = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "logout" });
  };

  return (
    <div className="flex justify-between gap-5 bg-slate-500 h-16 items-center px-5">
      <div>
        <ul className="flex justify-between gap-5">
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-center  text-white font-bold ${
                  isActive ? "bg-green-500" : "bg-green-900"
                } p-2 rounded-md items-center shadow-md`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `text-center  text-white font-bold ${
                  isActive ? "bg-green-500" : "bg-green-900"
                } p-2 rounded-md items-center shadow-md`
              }
              to="/employee_list"
            >
              Employee List
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-between gap-5">
        <h3 className="text-center text-black font-bold p-2 items-center">
          {admin.name}
        </h3>
        <button
          className="text-center text-white font-bold bg-red-700 px-4 py-1 rounded-lg items-center shadow-md"
          onClick={HandleClick}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
