const product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product.ejs", { title: "Add Car" , isAuthenticated: req.session?.isAuthenticated || false,});
};
exports.postAddProduct = (req, res, next) => {
    const b_name = req.body.name;
    const b_price = req.body.price;
    const b_description = req.body.description;
    const b_imageUrl = req.body.imageurl; // Use consistent field name
  
    const newProduct = new product({
      name: b_name,
      price: b_price,
      description: b_description,
      imageUrl: b_imageUrl, // Ensure this matches the schema
    });
  
    newProduct
      .save()
      .then(() => {
        res.redirect("/admin/products");
      })
      .catch((err) => {
        console.error("Error saving product:", err);
        res.status(500).send("Error saving product.");
      });
  };
exports.getProducts = (req, res, next) => {
  product.find().then((allproducts) => {
    res.render("admin/products.ejs", {
      title: "Admin Car Products",
      products: allproducts,
      isAuthenticated: req.session?.isAuthenticated || false,
    });
  });
};
exports.getDeleteProduct = (req, res, next) => {
    const product_id = req.params.ProductId;
    product.findByIdAndDelete(product_id)
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Failed to delete the product.");
        });
};

exports.getEditProduct = (req, res, next) => {
  const product_id = req.params.ProductId;
  product.findById(product_id).then((found_product) => {
    res.render("admin/edit-product.ejs", {
      title: "Edit Info",
      p: found_product,
      isAuthenticated: req.session?.isAuthenticated || false,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body._id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;

    if (!name || !description || !price) {
        return res.status(400).send('All fields are required.');
    }

    product.findById(prodId).then((product) => {
        if (!product) {
            return res.status(404).send('Product not found.');
        }
        product.name = name;
        product.description = description;
        product.price = price;
        return product.save();
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(err => next(err));
};


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.id; 
    product.findByIdAndDelete(prodId)
        .then((result) => {
            if (!result) {
                return res.status(404).send("Product not found.");
            }
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Failed to delete the product.");
        });
};