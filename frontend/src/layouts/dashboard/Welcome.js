import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div className="text-2xl font-semibold">Dashboard</div>
      <div>
        Welcome Back <strong>{user && user.name}</strong>
      </div>
    </div>
  );
};

export default Welcome;
