var mongoose = require("mongoose");

var breakfastSchema = mongoose.Schema({
   food: String, 
   price: Number
});

module.exports = mongoose.model("Breakfast", breakfastSchema);