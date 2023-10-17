import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`http://localhost:4000/products/${id}`);
      setName(data.name);
      setDescription(data.description);
    };
    getProduct();
  }, [id]);

  const editProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:4000/products/${id}`, {
        name,
        description,
      });

      setMessage("Product updated successfully");
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Products</h2>
        <p className="text-base">Edit Product</p>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={editProduct} className="flex flex-col">
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
              <label>Description</label>
              <input
                type="text"
                placeholder="Please Input price"
                className="w-full my-2 text-white input input-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="my-5">
              <button
                type="submit"
                className="p-3 my-2 font-bold text-white bg-blue-800 rounded-md hover:bg-opacity-80"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
