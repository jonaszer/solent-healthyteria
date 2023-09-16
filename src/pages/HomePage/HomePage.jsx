import React from "react";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/products/Products";

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
