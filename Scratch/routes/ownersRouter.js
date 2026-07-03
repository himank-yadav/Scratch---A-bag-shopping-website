const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model")

router.get("/admin", function(req, res) {
    let success = req.flash("success");
    res.render("createproducts", {success});
});

module.exports = router; 