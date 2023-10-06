import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const productsPerPage = 10;

  const apiUrl = process.env.REACT_APP_API_PRODUCTS;

  const fetchProducts = async () => {
    const { data } = await axios.get(apiUrl);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchProducts();
  };

  const calculateTotalPages = () => {
    const filteredProducts = products.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const priceMatch = product.price.toString().includes(searchText);
      return nameMatch || priceMatch;
    });
    return Math.ceil(filteredProducts.length / productsPerPage);
  };

  const totalPages = calculateTotalPages();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const priceMatch = product.price.toString().includes(searchText);
    return nameMatch || priceMatch;
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Products</h2>
        Product List
      </div>
      <div className="flex justify-between gap-5 my-3">
        <Link to="/products/add">
          <button className="p-3 text-white bg-blue-800 rounded-md hover-bg-blue-700">
            Add Product
          </button>
        </Link>
        <div className="text-white form-control">
          <input
            type="text"
            placeholder="Search"
            className="w-24 input input-bordered md:w-auto"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
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
          {filteredProducts
            .slice(indexOfFirstProduct, indexOfLastProduct)
            .map((product, index) => (
              <tr key={product.uuid}>
                <td>{indexOfFirstProduct + index + 1}</td>
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
      <div className="flex justify-center py-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ProductList;
