const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");
const productValidator = require("../models/productValidator")
const productValidate = require("../models/validateRequest")
router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.get('/products',adminController.getProducts);
router.get('/edit-product/:ProductId',adminController.getEditProduct);
router.post('/edit-product',adminController.postEditProduct);
router.get('/delete-product/:ProductId',adminController.getDeleteProduct);
router.post('/add-product',productValidator.add, productValidate,adminController.postAddProduct);

module.exports = router;
