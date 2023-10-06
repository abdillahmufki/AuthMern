import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:4000/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4000/products/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Products</h2>
        Product List
      </div>
      <Link to="/products/add">
        <button className="p-3 text-white bg-blue-800 rounded-md hover:bg-blue-700">
          Add Product
        </button>
      </Link>
      <table className="table">
        <thead className="text-base text-black">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.user.name}</td>
              <td>
                <div className="flex flex-row max-[567px]:flex-col justify-start gap-5">
                  <Link to={`/products/edit/${product.uuid}`}>
                    <button className="p-3 text-white bg-green-800 rounded-md hover:bg-green-700">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.uuid)}
                    className="p-3 text-white bg-red-800 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
