var mongoose = require("mongoose");

var drinkSchema = mongoose.Schema({
    beverage: String,
    price: Number
});

module.exports = mongoose.model("Drink", drinkSchema);