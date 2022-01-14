const e = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  hose: "localhost",
  password: "HelloShopify",
  database: "inventorysystem",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;

  db.query(
    "INSERT INTO products (product_name, category_id, product_description) VALUES (?,?,?)",
    [name, category, description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted into products table");
      }
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});
