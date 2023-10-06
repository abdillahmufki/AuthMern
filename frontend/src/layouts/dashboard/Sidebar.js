import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoMenu,
  IoLogOut,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser, reset } from "../../features/authSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/admin");
  };

  return (
    <>
      <div className="drawer lg:drawer-open fixed left-0 max-[996px]:z-50">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-2  items-start justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="hover:cursor-pointer text-3xl text-black drawer-button lg:hidden"
          >
            <IoMenu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu w-56 min-h-full bg-base-200 text-base-content max-[640px]:pt-14">
            {/* Sidebar content here */}
            <li className="p-2">
              <ul>
                <summary className="mb-3">General</summary>
                <li>
                  <NavLink to="/dashboard">
                    <IoHome />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products">
                    <IoPricetag />
                    Products
                  </NavLink>
                </li>
              </ul>
            </li>
            {user?.role === "admin" && (
              <li className="p-2">
                <ul>
                  <summary className="mb-3">Admin</summary>
                  <li>
                    <NavLink to="/users">
                      <IoPerson />
                      Users
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li className="p-2">
              <ul>
                <summary className="mb-3">Setting</summary>
                <li>
                  <button onClick={logout}>
                    <IoLogOut className="text-xl" /> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
