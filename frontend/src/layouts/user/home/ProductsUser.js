import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";

const ProductsUser = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("http://localhost:4000/products-user");
      setProducts(data);
    };
    getProducts();
  }, []);

  // Menghitung jumlah halaman yang diperlukan
  const totalPages = Math.ceil(products.length / productsPerPage);
  // Mengambil produk untuk halaman saat ini
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen p-5 py-10 bg-white">
      <div className="flex justify-center py-5">
        <h2 className="py-10 text-4xl font-semibold text-black">Products</h2>
      </div>
      <div className="grid items-center justify-center grid-cols-2 gap-4 my-10 lg:grid-cols-4 md:grid-cols-2">
        {currentProducts.length === 0 ? (
          <div>
            <p className="text-center text-black">Product not found</p>
          </div>
        ) : (
          currentProducts.map((product, index) => (
            <div key={index}>
              <div className="shadow-xl w-[165px] lg:w-72 md:w-96 card card-compact bg-[#f5f5f5] text-black">
                <figure>
                  <img
                    src={`../../../../../backend/public/images/${product.image}`}
                    alt={`Foto ${product.name}`}
                    className="scale-100 hover:scale-125 ease-in duration-200 text-sm"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="text-lg font-semibold card-title">
                    {product.name}
                  </h3>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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

export default ProductsUser;
