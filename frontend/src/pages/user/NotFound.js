import React from "react";
import Image from "../../assets/images/notfound.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="min-h-screen">
        <div className="py-10">
          <div className="flex items-center justify-center">
            <img src={Image} width={500} alt="NotFound" />
          </div>
          <p className="text-lg text-center">
            The page you requested was not found.{" "}
            <Link to="/" className="text-blue-500 hover:opacity-80">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
