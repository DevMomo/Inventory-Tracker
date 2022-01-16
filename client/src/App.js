import "./App.css";
import { useDebugValue, useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(0);

  const displayInfo = () => {
    console.log(name, category, description);
  };

  const [newName, setNewName] = useState();
  const [newCategory, setNewCategory] = useState();
  const [newDescription, setNewDescription] = useState();

  const [productsList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [visibleEditFieldsList, setVisibleEditFields] = useState({});

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

  const updateProduct = (id) => {
    Axios.put("http://localhost:3001/update", {
      name: newName,
      category_id: newCategory,
      description: newDescription,
      id: id,
    }).then((response) => {
      setProductsList(
        productsList.map((val) => {
          return val.product_id == id
            ? {
                product_id: val.product_id,
                product_name: newName ?? val.product_name,
                category_id: newCategory ?? val.category_id,
                product_description: newDescription ?? val.product_description,
              }
            : val;
        })
      );
    });
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setProductsList(
        productsList.filter((val) => {
          return val.product_id != id;
        })
      );
    });
  };

  const toggleVisibility = (id) => {
    setVisibleEditFields((prev) =>
      Boolean(!prev[id]) ? { ...prev, [id]: true } : { ...prev, [id]: false }
    );
  };

  const getCategories = () => {
    console.log("Fetching categories");
    Axios.get("http://localhost:3001/categories", {}).then((response) => {
      setCategoryList(
        response.data.reduce(
          (obj, e) => ({ ...obj, [e.category_id]: e.category_name }),
          {}
        )
      );
    });
  };

  const getCategoryName = (id) => {
    if (Object.keys(categoryList).length === 0) {
      getCategories();
    }
    return categoryList[id];
  };

  const getCategoryListString = () => {
    var categoryString = ""
    for (const [key, value] of Object.entries(categoryList)) {
      categoryString += key + ': ' + value + '\n';
    }
    return categoryString;
  };

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="information">
        <button onClick={() => getCategoryName(1)}>Categories</button>
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
              <div className="productElemets">
                <h5>
                  <em>Name:</em> {val.product_name}
                </h5>
                <h5>
                  <em>Category:</em> {getCategoryName(val.category_id)}
                </h5>
                <h5>
                  <em>Description:</em> {val.product_description}
                </h5>
              </div>
              <div className="editDeleteButtons">
                <button onClick={() => toggleVisibility(val.product_id)}>
                  <i class="fa fa-pencil" title="Edit"></i>
                </button>
                <button
                  onClick={() => {
                    deleteProduct(val.product_id);
                  }}
                >
                  <i class="fa fa-trash" title="Delete"></i>
                </button>
              </div>
              {visibleEditFieldsList[val.product_id] && (
                <div className="editElements">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter new name"
                      onChange={(event) => {
                        setNewName(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <input
                      type="number"
                      title={getCategoryListString()}
                      placeholder="Enter new category"
                      onChange={(event) => {
                        setNewCategory(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter new description"
                      onChange={(event) => {
                        setNewDescription(event.target.value);
                      }}
                    ></input>
                  </div>
                  <button
                    className="updateButton"
                    onClick={() => {
                      updateProduct(val.product_id);
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
