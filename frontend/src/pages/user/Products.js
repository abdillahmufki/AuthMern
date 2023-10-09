import React from "react";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import Hero from "../../layouts/user/home/Hero";
import ProductList from "../../layouts/user/products/ProductList";
const Products = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="min-h-screen bg-white">
        <Hero />
        <ProductList />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Products;
