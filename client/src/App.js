import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(0);

  const displayInfo = () => {
    console.log(name, category, description);
  };

  const [productsList, setProductsList] = useState([]);

  const addProduct = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      category: category,
      description: description,
    }).then(() => {
      console.log(name, category, description);
      setProductsList([
        ...productsList,
        {
          product_name: name,
          category_id: category,
          product_description: description,
        },
      ]);
    });
  };

  const getProducts = () => {
    Axios.get("http://localhost:3001/products", {}).then((response) => {
      setProductsList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Category:</label>
        <input
          type="number"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <label>Description:</label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <button onClick={addProduct}>Add</button>
      </div>
      <hr />
      <div className="products">
        <button onClick={getProducts}>Show Products</button>

        {productsList.map((val, key) => {
          return (
            <div className="product">
              <h4>Name: {val.product_name}</h4>
              <h4>Category: {val.category_id}</h4>
              <h4>
                Description:{" "}
                <p className="productDescription">{val.product_description}</p>
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
