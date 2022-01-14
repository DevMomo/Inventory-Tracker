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

  const [newName, setNewName] = useState("");

  const [productsList, setProductsList] = useState([]);

  const addProduct = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      category: category,
      description: description,
    }).then(() => {
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

  const updateProductName = (id) => {
    Axios.put("http://localhost:3001/update", { name: newName, id: id }).then(
      (response) => {
        setProductsList(
          productsList.map((val) => {
            return (val.product_id == id
              ? {
                  product_id: val.product_id,
                  product_name: newName,
                  category_id: val.category_id,
                  product_description: val.product_description,
                }
              : val);
          })
        );
      }
    );
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
              <div>
                <h5>
                  <em>Name:</em> {val.product_name}
                </h5>
                <h5>
                  <em>Category:</em> {val.category_id}
                </h5>
                <h5>
                  <em>Description:</em> {val.product_description}
                </h5>
              </div>
              <div className="editElements">
                <input
                  type="text"
                  placeholder="Enter new name"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateProductName(val.product_id);
                  }}
                >
                  Update
                </button>
                <input type="number" placeholder="Enter new category"></input>
                <button>Update</button>
                <input type="text" placeholder="Enter new description"></input>
                <button>Update</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
