const mongoose = require("mongoose");

// Category Schema
const CategorySchema = mongoose.Schema({
    name: {
        type: String,
    }
});

const Category = (module.exports = mongoose.model("Category", CategorySchema));