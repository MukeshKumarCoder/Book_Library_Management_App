import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/m.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      dispatch(logout());
      toast.success("Logout successful!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error("something went wrong");
    }
  };


  return (
    <nav className="w-full border-b border-[#e6dede] bg-amber-200 h-17 flex items-center">
      <div className="flex justify-between items-center w-11/12 m-auto ">
        <Link className="w-[3rem] h-[3rem] rounded-full " to={"/"}>
          <img className="w-[100%] " src={logo} alt="Logo" />
        </Link>
        <div className="flex justify-center items-center gap-x-3 font-bold">
          <Link to={"/"}>Home</Link>
          <Link to={"/mybooks"}>My Books</Link>
          {token ? (
            <Link
              to={"/"}
              className="border border-amber-500 bg-amber-600 py-2 px-3 rounded-md cursor-pointer text-white"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="border border-amber-500 bg-amber-600 py-2 px-3 rounded-md cursor-pointer text-white"
            >
              Login
            </Link>
          )}
          <div>{user && <p>{user.email}</p>}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
