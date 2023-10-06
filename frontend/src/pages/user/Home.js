import React, { useEffect } from "react";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import Hero from "../../layouts/user/home/Hero";
import ProductsUser from "../../layouts/user/home/ProductsUser";
const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <React.Fragment>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <ProductsUser />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
