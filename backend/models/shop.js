const mongoose = require("mongoose");

// Shop Schema
const ShopSchema = mongoose.Schema({ 
    name: {
        type: String,
    },
    telephoneNumber: {
        type: String,
    },
    description: {
        type: String,
    }, 
    address: {
        type: String,
    },
});

const Shop = (module.exports = mongoose.model("Shop", ShopSchema));