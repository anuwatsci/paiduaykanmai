const express = require("express");
const router = express.Router(); 
const Product = require("../models/product");

// GET /products
router.get("/", (req, res) => {
    const p = req.query.p ? req.query.p : 1;
    Product.find({}, (error, products) => {
        if (error) console.log(error);
        res.json(products);
    })
        .skip((p - 1) * 4)
        .limit(4);
});

// GET /products/category
router.get("/:category", (req, res) => {
    const cat = req.params.category;
    const p = req.query.p ? req.query.p : 1;

    Product.find({ category: cat }, (error, products) => {
        if (error) console.log(error);
        res.json(products);
    })
        .skip((p - 1) * 4)
        .limit(4);
});

// GET /count/category
router.get("/count/:category", (req, res) => {
    const cat = req.params.category;

    if (cat === "all") {
        Product.countDocuments({}, (error, count) => res.json(count));
    } else {
        Product.countDocuments({ category: cat }, (error, count) =>
            res.json(count)
        );
    }
});

// POST /products
router.post("/", (req, res) => {
    const name = req.fields.name;
    const category = req.fields.category;
    const description = req.fields.description;
    const price = req.fields.price;
    const unitName = req.fields.unitName;   

    const product = new Product({
        name: name,
        category: category,
        description: description,
        unitName: unitName, 
        price: price
    });

    product.save((error) => {
        if (error) res.status(500).send(error);
        res.status(201).end();
    });
});

// PUT /products
router.put("/", (req, res) => {
    const id = req.fields.id; 
    const name = req.fields.name;
    const category = req.fields.category;
    const description = req.fields.description;
    const price = req.fields.price;
    const unitName = req.fields.unitName;  
    
    Product.findById(id, (error, product) => {
        if (error) res.status(500).send(error); 
        product.name = name;
        product.category = category;
        product.description = description;
        product.price = price;
        product.unitName = unitName; 

        product.save((error) => {
            if (error) res.status(500).send(error);
            res.status(201).end();
        });
    });
});

// DELETE /products/5
router.delete("/:id", (req, res) => {
    Product.findById(req.params.id, (error, product) => {
        if (error) res.status(500).send(error); 
        product.remove();
        res.status(204).end();
    });
});

module.exports = router;
