import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Card from "../Card/Card";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useEffect(() => {
    const collectionRef = collection(db, "products");

    getDocs(collectionRef).then((snapshot) => {
      const fetchedProducts = snapshot.docs.map((doc) => doc.data());
      setProducts(fetchedProducts);
    });
  }, []);

  const categories = ["Sandwiches", "Salads", "Drinks"];

  const filteredProducts = products.filter(
    (product) => product.type === categories[activeCategoryIndex]
  );

  const chevronRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      className="chevron">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );

  const chevronLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      className="chevron">
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
  );

  const incrementCategory = () => {
    setActiveCategoryIndex((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

  const decrementCategory = () => {
    setActiveCategoryIndex((prev) => {
      if (prev === 0) {
        return categories.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  return (
    <>
      <div className="all-products-container">
        <h1>Menu</h1>
        <div className="category">
          <div className="category-title">
            <div onClick={decrementCategory}>{chevronLeft}</div>
            <h2>{categories[activeCategoryIndex]}</h2>
            <div onClick={incrementCategory}>{chevronRight}</div>
          </div>
          <div className="sandwich-items-container">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
