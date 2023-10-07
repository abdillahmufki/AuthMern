import React, { useState, useEffect } from "react";
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

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-center py-10">
        <h2 className="text-2xl font-semibold">Products</h2>
      </div>
      <div className="grid items-center justify-center grid-cols-2 gap-4 my-10 lg:grid-cols-4 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.uuid}>
            <div className="shadow-xl w-52 lg:w-72 md:w-96 card card-compact bg-base-100">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-semibold card-title">
                  {product.name}
                </h3>
                <p>Rp. {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
