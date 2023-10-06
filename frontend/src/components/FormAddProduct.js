import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/products", {
        name,
        price,
      });

      setMessage("Product added successfully");
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="text-black">
        <h2 className="text-2xl font-semibold">Products</h2>
        <p className="text-base">Add New Product</p>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={addProduct} className="flex flex-col">
            <p>{message}</p>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Please Input Product Name"
                className="w-full my-2 text-white input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="text"
                placeholder="Please Input price"
                className="w-full my-2 text-white input input-bordered"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
    </React.Fragment>
  );
};

export default FormAddProduct;
