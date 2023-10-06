import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/users", {
        name,
        email,
        password,
        confPassword,
        role,
      });

      setMessage("User added successfully");
      navigate("/users");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold">Users</h2>
        <p className="text-base">Add New User</p>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={addUser} className="flex flex-col">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Please Input Name"
                className="w-full my-2 text-white input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Please Input Email"
                className="w-full my-2 text-white input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Please Input Password"
                className="w-full my-2 text-white input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Please Confirm Password"
                className="w-full my-2 text-white input input-bordered"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-white select select-bordered"
              >
                <option defaultValue={" Select Role"} disabled selected>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="my-5">
              <button
                type="submit"
                className="p-3 my-2 font-bold text-white bg-blue-800 rounded-md hover:bg-opacity-80"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
