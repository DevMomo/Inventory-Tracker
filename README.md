# Simple Inventory Tracker
 Made for Shopify Technical Challenge - Summer 2022

<!-- ABOUT THE PROJECT -->
## About The Project

The Simple Inventory Tracker is, as the name implies, a simple CRUD application where you can add, edit, and delete items to and from an inventory system. Made by me for my Shopify Summer 2022 internship application.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [MySQL](https://www.mysql.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

* MySQL Community Edition (or the paid version if you're a baller!)
  https://dev.mysql.com/downloads/mysql/

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/DevMomo/Inventory-Tracker.git
   ``` 
2. Install client side react.js dependancies
    - cd into Inventory-Tracker\client
    - run `npm install `

    _Troubleshooting:_
    - npm may detect some vulnerabilities depending on how old certain components are. Please try `npm audit fix` in this case. You may need to run this more than once.

3. Install server side node.js dependancies
    - cd into Inventory-Tracker\server
    - run `npm install `
    
4. Install the database
   - Download and run the MySQL installer
   - In the Type and Networking step, use the default connevtivity parameters:
        - Connection Method: TCP/IP
        - Hostname: 127.0.0.1
        - Port: 3306
   - In the Authentication Method step, use the default Strong Password Encryption option
   - In the Accounts and Roles step, use:
        - Username: root
        - Password: HelloShopify

### Preparing the Database

Here's a rough text sketch of the simple schema used:

```
inventorysystem |
                |--- categories |
                |               |--- category_id
                |               |--- category_name                
                |
                |--- products |
                |             |--- product_id
                |             |--- category_id  
                |             |--- product_name 
                |             |--- product_description 
```

This part can be finnicky. I did my best to investigate all possible side effects in me personal testing. I've also prepared a database dump with some sample values that you can use to initialize the database.

1. cd to the db folder
2. Create a database with the name "inventorysystem" 
  ```sh
  mysql -u root -p -e "create database inventorysystem"
   ````
4. Import the database dump
 ```sh
 mysql -u username -p inventorysystem < inventory_tracker_db.sql
 ```

Troubleshooting:
* `mysql` path may not be set properly during installation:
    - You can find the MySQL shell in `/usr/local/mysql/bin`
* Wrong password, can't authenticate:
    - Sometimes, the new password set during installation isn't registered and you may have trouble authenticating your SQL commands. 
    - Set the password manuallly by running 
    ```sh
    mysql ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'HelloShopify'
    ```
* Importing database dump is failing:
    - I've found the different versions of MySQL prepare the dump file with different syntax, and that introduces some incompatibility
    - I prepared the dump file using MySQL Community 8.0.27
    - In this case, you can open the dump file in a text editor and copy the SQL commands one by one manually

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

- run `node index.js`
 - the server initialization is successful if you see the message `Server is running on port 3001!`

- run `npm start` to build and initialize the client
  - the client side build is successful if the command line show the message _webpack 5.65.0 compiled_ and a browser should fire up with the site loading at _localhost:3000_

- Using the app is fairly straightforward, but I'd like to highlight some features:
    - I chose to implement the CSV download for this project. You'll see the download button front and centre!
    
    ![download](https://user-images.githubusercontent.com/2815800/149771563-20bd9d77-5474-4837-a5dd-55f34143ca3b.png)
    
    - You can edit or delete an entry using these two buttons, respectively.
    
    ![editdelete](https://user-images.githubusercontent.com/2815800/149771594-67032f4e-eb8a-402a-b1a7-27728e5b2f8b.png)
    
    - When adding or editing a product, hover over the category input field to see a list of categories.
    
    ![categories](https://user-images.githubusercontent.com/2815800/149771610-c1b08720-34ea-4baf-91b2-654377d24497.png)

Enjoy! 💕

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- THANKYOU -->
## Thank You!

Thank you for taking the time to check this out! :)

And I'm sorry if the database is causing any grief. It sure gave me plenty! 

<p align="right">(<a href="#top">back to top</a>)</p>
