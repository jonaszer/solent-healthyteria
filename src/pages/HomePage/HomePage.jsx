import React from "react";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/products/Products";
import NavBar from "../../components/Navigation/NavBar";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Products />
      <Footer />
    </>
  );
};

export default HomePage;
