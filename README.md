# E-Commerce Backend System


# Objective
This project is designed to create a small e-commerce backend system using Node.js and Sequelize ORM. It helps in understanding database interactions, ORM modeling, and building RESTful APIs in Node.js.


# Features
# User Management
Users can sign up, log in, and log out.
Passwords are securely hashed using bcrypt.
JWT-based authentication for secured routes.

# Product Management
Admin users can add, update, delete, and view products.
Products include fields such as:
id
name
price
description
quantity
category (linked to a Category model)
imageUrl (optional)

# Shopping Cart
Authenticated users can:
Add items to their shopping cart.
View their cart with product details and total price.
Update the quantity of items in the cart.
Remove items from the cart.

# Order Management
Users can place an order for items in their cart.
Order details are stored in an Order model with the following fields:
orderId
userId (relation to the User model)
products (array of product details)
totalPrice
status (e.g., pending, confirmed, shipped)
createdAt, updatedAt

# Database Design
Models
User
Product
Category
Cart
Order

# Relationships
A user can have many orders.
An order contains many products.
Products belong to categories.


# Tools & Technologies
Node.js with Express.
Sequelize ORM for database management.
MySQL as the relational database.
JWT for authentication.
bcrypt for password hashing.
Postman for testing the API.

# Setup Instructions
Clone the Repository
Copy code
# git clone https://github.com/thesumitt18/Ecommerce.git
Install Dependencies
npm install
set up the required values in the new file named as .env.
Setup the Database
MySQL database.
Update the database configuration in config/config.js (depending on your setup).
Start the Server.


# Contribution
Feel free to fork the repository and submit a pull request for any improvements.

Author
Sumit Patwal

