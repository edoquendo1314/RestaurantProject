var mongoose = require("mongoose");

var dessertSchema = mongoose.Schema({
     food: String, 
     price: Number
});

module.exports = mongoose.model("Dessert", dessertSchema);