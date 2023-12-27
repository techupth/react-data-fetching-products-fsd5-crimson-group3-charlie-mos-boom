import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProducts(result.data.data);
    console.log(result);
  };

  const deleteProducts = async (index, id) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    await axios.delete(`http://localhost:4001/products/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product, index) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProducts(index, product.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
