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

  const addProduct = () => {
    Axios.post("http://localhost:3000/create", {
      name: name,
      category: category,
      description: description,
    }).then(() => {
      console.log("addProduct call success");
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
    </div>
  );
}

export default App;
