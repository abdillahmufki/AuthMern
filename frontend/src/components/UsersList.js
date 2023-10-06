import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const apiUrl = process.env.REACT_APP_API_USERS;

  const getUsers = async () => {
    const { data } = await axios.get(apiUrl);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    getUsers();
  };

  return (
    <di>
      <div className="mb-5 text-black">
        <h2 className="text-2xl font-semibold ">Users</h2>
        <p className="text-base">List of User</p>
      </div>
      <Link to="/users/add">
        <button className="p-3 text-white bg-blue-800 rounded-md hover:bg-blue-700">
          Add user
        </button>
      </Link>
      <table className="table">
        <thead className="text-base text-black">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="flex justify-start gap-5 max-[567px]:flex-col ">
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="p-3 text-white bg-green-800 rounded-md button hover:bg-green-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="p-3 text-white bg-red-800 rounded-md button hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </di>
  );
};

export default UsersList;
