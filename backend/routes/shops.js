const express = require("express");
const router = express.Router();

const Shop = require("../models/shop");

// GET /shops
router.get("/", (req, res) => {
    Shop.find({}, (error, shops) => {
        if (error) console.log(error);
        res.json(shops);
    });
});

// POST /shops
router.post("/", (req, res) => {
    const name = req.fields.name;
    const telephoneNumber = req.fields.telephoneNumber;
    const description = req.fields.description;
    const address = req.fields.address;
    const shop = new Shop({
        name: name,
        telephoneNumber: telephoneNumber,
        description: description,
        address: address,
    });

    shop.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /shops/5
router.put("/:id", (req, res) => {
    const id = req.params.id; 
    const name = req.fields.name;
    const telephoneNumber = req.fields.telephoneNumber;
    const description = req.fields.description;
    const address = req.fields.address;

    Shop.findById(id, (error, shop) => {
        if (error) console.log(error);

        shop.name = name;
        shop.telephoneNumber = telephoneNumber;
        shop.description = description;
        shop.address = address;

        shop.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Shop.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
