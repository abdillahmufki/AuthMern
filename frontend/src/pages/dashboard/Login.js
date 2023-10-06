import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, iseLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div
      className="min-h-screen hero"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1682687220566-5599dbbebf11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1375&q=80")`,
      }}
    >
      <div className="text-center hero-content">
        <div className="p-10">
          {" "}
          {isError && (
            <div className="my-3 text-sm font-bold text-center text-red-500">
              {message}
            </div>
          )}
          <h2 className="text-xl font-bold text-white">Sign in</h2>
          <form className="flex flex-col mt-5" onSubmit={Auth}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-2 my-1 text-sm border-b-2 border-gray-400 rounded-md outline-none opacity-90 focus:border-blue-400"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="w-full p-2 my-1 text-sm border-b-2 border-gray-400 rounded-md outline-none opacity-90 focus:border-blue-400"
            />
            <button
              type="submit"
              className="p-2 my-2 font-bold text-white bg-blue-800 rounded-md hover:bg-opacity-80"
            >
              {iseLoading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
