import React, { useEffect } from "react";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import Hero from "../../layouts/user/Hero";
const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <React.Fragment>
      <Header />
      <main className="min-h-screen">
        <Hero />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
