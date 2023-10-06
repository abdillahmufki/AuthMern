import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="flex justify-between">
        <Sidebar />
        <div className="w-screen min-h-screen text-black bg-white lg:ms-56 lg:z-10">
          <main className="p-10">{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
