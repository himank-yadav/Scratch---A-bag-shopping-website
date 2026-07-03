const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  res.render("index",{
    error: "", Loggedin: false 
  });
});

router.get("/shop", isLoggedin, async function (req, res) {
  let products = await productModel.find();
  res.render("shop.ejs", { products });
});

router.get("/addtocart/:id", isLoggedin, async function (req, res) {
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Product added to cart successfully!");
    res.redirect("/shop");
});

router.get("/cart", isLoggedin, async function (req, res) {
  let user = await userModel.findOne({email: req.user.email}).populate("cart");
  res.render("cart.ejs",{user})
});

router.get("/removefromcart/:id", isLoggedin, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });

        user.cart = user.cart.filter(item => {
            return item && item.toString() !== req.params.id;
        });

        await user.save();

        req.flash("success", "Product removed successfully!");
        res.redirect("/cart");

    } catch (err) {
        console.log(err);
        res.redirect("/cart");
    }
});

module.exports = router;
