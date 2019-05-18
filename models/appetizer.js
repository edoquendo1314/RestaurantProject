var mongoose = require("mongoose");

var appetizerSchema = mongoose.Schema({
    food: String,
    price: Number
});

module.exports = mongoose.model("Appetizer", appetizerSchema);