const e = require("express");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

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

app.get("/products/download", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log("failed to create products.csv.");
      console.log(err);
    } else {
      const jsonData = JSON.parse(JSON.stringify(result));

      try {
        const json2csvParser = new json2csv();
        var csv = json2csvParser.parse(jsonData);
        console.log(csv);
      } catch (csvErr) {
        console.log(csvErr);
      }

      const fileName = "products" + Date.now() + ".csv";
      const path = "./public/csv/" + fileName;

      fs.writeFile(path, csv, function (err, data) {
        if (err) {
          throw err;
        } else {
          res.download(path); // This is what you need
        }
      });
    }
  });
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const category_id = req.body.category_id;
  const description = req.body.description;
  db.query(
    "UPDATE products SET product_name = COALESCE(?, product_name), category_id = COALESCE(?, category_id), product_description = COALESCE(?, product_description) WHERE product_id = ?",
    [name, category_id, description, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE product_id = ?", id, (err, result) => {
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
