const Product = require("../models/products");
const User = require("../models/user");
const Order = require("../models/order");
exports.getIndex = (req, res, next) => {
  res.render("shop/index.ejs", {
    title: "Main Page",
    isAuthenticated: req.session?.isAuthenticated || false,
  });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/allproducts.ejs", {
        PageTitle: "All Products",
        products,
        isAuthenticated: req.session?.isAuthenticated || false,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while fetching products.");
    });
};



exports.getCart = (req,res,next) =>{}
    
    
exports.postCart = (req, res, next) => {}

exports.postCartDeleteItem = (req, res, next) => {};
exports.postOrder = (req, res, next) => {};
exports.getOrders = (req, res, next) => {};
