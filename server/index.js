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

/*
 * /create:
 *   POST:
 *     summary: Adds a new product entry to the products database.
 *     description: Adds a new product entry to the products database with user specified
 *     fields "name", "category_id", and "product_description".
 */
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

/*
 * /products:
 *   GET:
 *     summary: Retrieve all product entries from the products database.
 */
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/*
 * /products/download:
 *   GET:
 *     summary: Download all product entries from the products database in CSV format.
 *     description: 
 *       - Retrieve all product entries from the products database
 *       - Parse DB result into JSON
 *       - Write JSON data into CSV file
 *       - Serve CSV file as a download
 */
app.get("/products/download", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const jsonData = JSON.parse(JSON.stringify(result));
      try {
        const json2csvParser = new json2csv();
        var csv = json2csvParser.parse(jsonData);
        console.log("CSV parsed.");
      } catch (csvErr) {
        console.log(csvErr);
      }
      const fileName = "products" + Date.now() + ".csv";
      const path = "./public/csv/" + fileName;
      fs.writeFile(path, csv, function (err, data) {
        if (err) {
          throw err;
        } else {
          console.log("products.csv created.");
          res.download(path); // This is what you need
        }
      });
    }
  });
});

/*
 * /categories:
 *   GET:
 *     summary: Retrieve all category entries from categories database.
 */
app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/*
 * /update:
 *   PUT:
 *     summary: Update a product entry in the products database.
 *     description: Update a product entry in the products database. 
 *       If a field is left empty, COALESCE is used to use existing data.
 */
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

/*
 * /delete/:id:
 *   DELETE:
 *     summary: Removes an entry from products database given product_id.
 */
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
