const mongoose = require("mongoose");

// Product Schema
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    unitName: {
        type: String,
    }
});

const Product = (module.exports = mongoose.model("Product", ProductSchema));
